import { analyticsConfig } from './analyticsConfig';

export type AnalyticsConsent = 'accepted' | 'rejected' | null;
type EventParameters = Record<string, string | number | boolean>;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  [key: `ga-disable-${string}`]: boolean;
};

const analyticsWindow = window as unknown as AnalyticsWindow;
const consentKey = 'daniel.analytics.consent.v1';
const measurementId = analyticsConfig.measurementId;
export const analyticsEnabled = /^G-[A-Z0-9]+$/.test(measurementId);
export const analyticsReportUrl = analyticsConfig.reportUrl;
let consent = readAnalyticsConsent();
let initialized = false;
let pageViewSent = false;
const adsDenied = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
};

export function readAnalyticsConsent(): AnalyticsConsent {
  try {
    const value = localStorage.getItem(consentKey);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

function pageLocation() {
  // Avoid sending arbitrary query strings, hashes or form contents to Analytics.
  const url = new URL(window.location.pathname, window.location.origin);
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const value = new URLSearchParams(window.location.search).get(key);
    if (value && /^[\p{L}\p{N} _.-]{1,100}$/u.test(value)) url.searchParams.set(key, value);
  }
  return url.href;
}

function pageReferrer() {
  try {
    return new URL(document.referrer).origin;
  } catch {
    return '';
  }
}

function initializeTag() {
  if (!analyticsEnabled || consent !== 'accepted') return;
  analyticsWindow[`ga-disable-${measurementId}`] = false;
  if (!initialized) {
    initialized = true;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = function () {
      analyticsWindow.dataLayer!.push(arguments);
    };
    analyticsWindow.gtag('consent', 'default', { ...adsDenied, analytics_storage: 'denied' });
    analyticsWindow.gtag('consent', 'update', { ...adsDenied, analytics_storage: 'granted' });
    analyticsWindow.gtag('js', new Date());
    analyticsWindow.gtag('config', measurementId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: 'none',
      page_location: pageLocation(),
      page_referrer: pageReferrer(),
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.id = 'daniel-google-analytics';
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(tag);
  } else {
    analyticsWindow.gtag?.('consent', 'update', { ...adsDenied, analytics_storage: 'granted' });
  }
  if (!pageViewSent) {
    pageViewSent = true;
    trackAnalyticsEvent('page_view', { page_location: pageLocation(), page_title: document.title });
  }
}

function clearAnalyticsCookies() {
  const domains = ['', window.location.hostname, `.${window.location.hostname}`];
  for (const entry of document.cookie.split(';')) {
    const name = entry.split('=')[0].trim();
    if (name !== '_ga' && !name.startsWith('_ga_')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax`;
    }
  }
}

export function setAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  consent = value;
  try {
    localStorage.setItem(consentKey, value);
  } catch {
    // The current choice still applies if browser storage is unavailable.
  }
  if (value === 'accepted') {
    initializeTag();
  } else if (analyticsEnabled) {
    analyticsWindow[`ga-disable-${measurementId}`] = true;
    analyticsWindow.gtag?.('consent', 'update', { ...adsDenied, analytics_storage: 'denied' });
    clearAnalyticsCookies();
  }
  window.dispatchEvent(new Event('daniel:analytics-consent'));
}

export function trackAnalyticsEvent(name: string, parameters: EventParameters = {}) {
  if (!analyticsEnabled || consent !== 'accepted') return false;
  analyticsWindow.gtag?.('event', name, { ...parameters, transport_type: 'beacon' });
  return true;
}

export function startAnalytics() {
  if (!analyticsEnabled) return () => {};
  initializeTag();
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[data-analytics-contact], a[data-analytics-project]');
    if (!link) return;
    const location = link.closest<HTMLElement>('[data-analytics-location]')?.dataset.analyticsLocation || 'portal';
    if (link.dataset.analyticsContact) {
      trackAnalyticsEvent('contact_click', { contact_method: link.dataset.analyticsContact, button_location: location });
    } else if (link.dataset.analyticsProject) {
      trackAnalyticsEvent('project_click', { project_id: link.dataset.analyticsProject, button_location: location });
    }
  };
  document.addEventListener('click', onClick, true);
  return () => document.removeEventListener('click', onClick, true);
}

export function observeAnalyticsContent() {
  if (!analyticsEnabled || !('IntersectionObserver' in window)) return () => {};
  const recorded = new WeakSet<Element>();
  const record = (element: HTMLElement) => {
    if (recorded.has(element)) return;
    const section = element.dataset.analyticsSection;
    const sent = section
      ? trackAnalyticsEvent('section_view', { section_name: section })
      : trackAnalyticsEvent('service_view', { service_name: element.dataset.analyticsService || '' });
    if (sent) recorded.add(element);
  };
  const visible = new Set<HTMLElement>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (entry.isIntersecting) {
        visible.add(element);
        record(element);
      } else {
        visible.delete(element);
      }
    }
  }, { threshold: 0.5 });
  document.querySelectorAll<HTMLElement>('[data-analytics-section], [data-analytics-service]').forEach((element) => observer.observe(element));
  const onConsent = () => visible.forEach(record);
  window.addEventListener('daniel:analytics-consent', onConsent);
  return () => {
    observer.disconnect();
    window.removeEventListener('daniel:analytics-consent', onConsent);
  };
}
