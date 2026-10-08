import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { stripTypeScriptTypes } from 'node:module';

const source = readFileSync(new URL('../src/analytics.ts', import.meta.url), 'utf8');
const compiled = stripTypeScriptTypes(source.replace("import { analyticsConfig } from './analyticsConfig';", 'const analyticsConfig = __analyticsConfig;'))
  .replace(/^export (?=(function|const))/gm, '')
  + '\nObject.assign(exports, { startAnalytics, observeAnalyticsContent, setAnalyticsConsent, trackAnalyticsEvent });';

function createBrowser(measurementId = 'G-TEST1234', savedConsent = null, storageFails = false) {
  const storage = new Map(savedConsent ? [['daniel.analytics.consent.v1', savedConsent]] : []);
  const scripts = [];
  const listeners = new Map();
  const visibleElements = [{ dataset: { analyticsSection: 'servicios' } }, { dataset: { analyticsService: 'Diseño web' } }];
  let intersections;
  class Element {
    constructor(link) { this.link = link; }
    closest() { return this.link; }
  }
  const document = {
    title: 'Portal Daniel',
    referrer: 'https://example.com/private-path?token=secret',
    cookie: '_ga=value; _ga_TEST1234=value',
    head: { appendChild: (element) => scripts.push(element) },
    createElement: () => ({}),
    querySelectorAll: () => visibleElements,
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
  };
  const window = {
    location: { origin: 'https://landing-page-3d-daniel.onrender.com', pathname: '/', hostname: 'landing-page-3d-daniel.onrender.com', search: '?utm_source=facebook&utm_campaign=octubre&token=secret&email=private@example.com' },
    addEventListener: (name, callback) => listeners.set(name, callback),
    removeEventListener: (name) => listeners.delete(name),
    dispatchEvent: (event) => listeners.get(event.type)?.(),
    IntersectionObserver: true,
  };
  const exports = {};
  const sandbox = {
    window, document, exports, URL, URLSearchParams, Event, Element,
    localStorage: {
      getItem: (key) => { if (storageFails) throw new Error('Storage blocked'); return storage.get(key) || null; },
      setItem: (key, value) => { if (storageFails) throw new Error('Storage blocked'); storage.set(key, value); },
    },
    __analyticsConfig: { measurementId, reportUrl: '' },
    IntersectionObserver: class {
      constructor(callback) { intersections = callback; }
      observe() {}
      disconnect() { intersections = null; }
    },
  };
  vm.runInNewContext(compiled, sandbox);
  return {
    api: exports, window, scripts, listeners, document,
    commands: () => (window.dataLayer || []).map((args) => Array.from(args)),
    events: () => (window.dataLayer || []).map((args) => Array.from(args)).filter(([type]) => type === 'event'),
    seeContent: () => intersections?.(visibleElements.map((target) => ({ target, isIntersecting: true }))),
    click: (dataset) => listeners.get('click')?.({ target: new Element({ dataset, closest: () => ({ dataset: { analyticsLocation: 'portada' } }) }) }),
  };
}

const browser = createBrowser();
const stop = browser.api.startAnalytics();
const stopContent = browser.api.observeAnalyticsContent();
browser.seeContent();
browser.click({ analyticsContact: 'whatsapp' });
assert.equal(browser.scripts.length, 0, 'No tag may load before visitor consent');
assert.equal(browser.events().length, 0, 'No interaction may be recorded before consent');

browser.api.setAnalyticsConsent('accepted');
assert.equal(browser.scripts.length, 1);
assert.equal(browser.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-TEST1234');
const config = browser.commands().find(([command]) => command === 'config')[2];
assert.equal(config.allow_google_signals, false);
assert.equal(config.allow_ad_personalization_signals, false);
assert.equal(config.page_referrer, 'https://example.com');
assert.equal(config.page_location, 'https://landing-page-3d-daniel.onrender.com/?utm_source=facebook&utm_campaign=octubre');
assert.equal(browser.events().filter(([, name]) => name === 'page_view').length, 1);
assert.equal(browser.events().filter(([, name]) => name === 'section_view').length, 1);
assert.equal(browser.events().filter(([, name]) => name === 'service_view').length, 1);
browser.seeContent();
browser.api.setAnalyticsConsent('accepted');
assert.equal(browser.scripts.length, 1, 'Repeated consent must not insert a second tag');
assert.equal(browser.events().filter(([, name]) => name === 'page_view').length, 1, 'Consent must not duplicate page views');
assert.equal(browser.events().filter(([, name]) => name === 'section_view').length, 1, 'Repeated visibility must not inflate section views');

browser.click({ analyticsContact: 'whatsapp' });
browser.click({ analyticsContact: 'email' });
browser.click({ analyticsProject: 'aloia' });
assert.equal(browser.events().filter(([, name]) => name === 'contact_click').length, 2);
assert.equal(browser.events().find(([, name]) => name === 'project_click')[2].project_id, 'aloia');
const eventCount = browser.events().length;
browser.api.setAnalyticsConsent('rejected');
assert.equal(browser.window['ga-disable-G-TEST1234'], true);
browser.click({ analyticsContact: 'whatsapp' });
assert.equal(browser.events().length, eventCount, 'Revoking consent must stop all custom events');
stop();
stopContent();
assert.equal(browser.listeners.size, 0, 'Disposing analytics must remove listeners');

for (const measurementId of ['', 'invalid']) {
  const disabled = createBrowser(measurementId, 'accepted');
  disabled.api.startAnalytics();
  disabled.api.setAnalyticsConsent('accepted');
  assert.equal(disabled.scripts.length, 0, 'Missing or invalid GA4 configuration must keep tracking disabled');
}
for (const savedConsent of ['accepted', 'rejected']) {
  const returning = createBrowser('G-TEST1234', savedConsent);
  returning.api.startAnalytics();
  assert.equal(returning.scripts.length, savedConsent === 'accepted' ? 1 : 0);
}
const unavailableStorage = createBrowser('G-TEST1234', null, true);
unavailableStorage.api.startAnalytics();
unavailableStorage.api.setAnalyticsConsent('accepted');
assert.equal(unavailableStorage.scripts.length, 1, 'Storage restrictions must not break the page or the current consent choice');

console.log('Analytics checks passed: consent, revocation, page-view deduplication, attribution, contact/project clicks, content views, cleanup and disabled configuration.');
