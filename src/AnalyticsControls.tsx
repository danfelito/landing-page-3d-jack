import { useEffect, useState } from 'react';
import { BarChart3 } from 'lucide-react';
import {
  AnalyticsConsent,
  analyticsEnabled,
  analyticsReportUrl,
  observeAnalyticsContent,
  readAnalyticsConsent,
  setAnalyticsConsent,
} from './analytics';

export default function AnalyticsControls() {
  const [consent, setConsent] = useState<AnalyticsConsent>(readAnalyticsConsent);
  const [showOptions, setShowOptions] = useState(consent === null);

  useEffect(observeAnalyticsContent, []);

  if (!analyticsEnabled) return null;

  const choose = (value: 'accepted' | 'rejected') => {
    setAnalyticsConsent(value);
    setConsent(value);
    setShowOptions(false);
  };

  return (
    <>
      <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 px-5 py-6 text-xs text-ice/55">
        <button type="button" onClick={() => setShowOptions(true)} className="underline underline-offset-4 hover:text-ice">
          Preferencias de medición
        </button>
        {analyticsReportUrl && (
          <a href={analyticsReportUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ice" title="Acceso privado con la cuenta de Google del propietario">
            <BarChart3 size={15} /> Mis estadísticas
          </a>
        )}
      </footer>
      {showOptions && (
        <aside aria-labelledby="analytics-consent-title" className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-white/20 bg-[#15151a] p-5 text-ice shadow-2xl sm:inset-x-6">
          <h2 id="analytics-consent-title" className="text-lg font-semibold">Medición de visitas</h2>
          <p className="mt-2 text-sm leading-relaxed text-ice/75">
            Con tu permiso usamos cookies de Google Analytics para conocer las visitas, el origen del tráfico y los clics de este portal. Puedes cambiar tu elección aquí cuando quieras.
          </p>
          <a href="https://policies.google.com/technologies/partner-sites?hl=es" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs underline underline-offset-4 text-ice/70">Cómo utiliza Google estos datos</a>
          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={() => choose('accepted')} className="rounded-full border border-white/30 px-5 py-2 text-sm hover:bg-white/10">Aceptar medición</button>
            <button type="button" onClick={() => choose('rejected')} className="rounded-full border border-white/30 px-5 py-2 text-sm hover:bg-white/10">Rechazar medición</button>
          </div>
        </aside>
      )}
    </>
  );
}
