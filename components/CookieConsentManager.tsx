'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type ConsentState = {
  analytics: boolean;
  decidedAt: string;
};

const STORAGE_KEY = 'heyde-cookie-consent';
const SETTINGS_EVENT = 'heyde-open-cookie-settings';

const copy = {
  EN: {
    title: 'Cookie settings',
    body:
      'We use necessary storage to keep the site working and optional analytics to understand which pages are useful. You can accept, reject, or configure analytics.',
    accept: 'Accept',
    reject: 'Reject',
    configure: 'Configure',
    save: 'Save choice',
    analytics: 'Analytics cookies',
    analyticsBody:
      'Allows Google Analytics to measure visits and interactions. Disabled unless you accept it.',
    necessary: 'Necessary cookies',
    necessaryBody:
      'Required for language preference and consent storage. Always active.',
    policy: 'Cookie policy',
  },
  ES: {
    title: 'Configuración de cookies',
    body:
      'Usamos almacenamiento necesario para que la web funcione y analítica opcional para entender qué páginas son útiles. Puedes aceptar, rechazar o configurar analíticas.',
    accept: 'Aceptar',
    reject: 'Rechazar',
    configure: 'Configurar',
    save: 'Guardar elección',
    analytics: 'Cookies analíticas',
    analyticsBody:
      'Permiten usar Google Analytics para medir visitas e interacciones. No se activan salvo que aceptes.',
    necessary: 'Cookies necesarias',
    necessaryBody:
      'Necesarias para recordar idioma y consentimiento. Siempre activas.',
    policy: 'Política de cookies',
  },
} as const;

function readConsent(): ConsentState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (typeof parsed.analytics !== 'boolean' || typeof parsed.decidedAt !== 'string') {
      return null;
    }

    return {
      analytics: parsed.analytics,
      decidedAt: parsed.decidedAt,
    };
  } catch {
    return null;
  }
}

function writeConsent(analytics: boolean): ConsentState {
  const consent = {
    analytics,
    decidedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  return consent;
}

function deleteCookie(name: string) {
  const host = window.location.hostname;
  const rootDomain = host.split('.').slice(-2).join('.');
  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

  document.cookie = `${name}=; expires=${expires}; path=/`;
  document.cookie = `${name}=; expires=${expires}; path=/; domain=${host}`;
  document.cookie = `${name}=; expires=${expires}; path=/; domain=.${rootDomain}`;
}

function disableGoogleAnalytics(gaId?: string) {
  if (gaId) {
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true;
  }

  ['_ga', '_gid', '_gat', `_ga_${gaId?.replace(/^G-/, '')}`].forEach((name) => {
    if (name) deleteCookie(name);
  });
}

function GoogleAnalytics({ gaId, enabled }: { gaId?: string; enabled: boolean }) {
  if (!gaId || !enabled) return null;

  return (
    <>
      <Script
        id="google-analytics-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window['ga-disable-${gaId}'] = false;
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${gaId}');

            document.addEventListener('click', function(e) {
              var target = e.target && e.target.closest ? e.target.closest('a') : null;
              if (target && target.href && target.href.includes('calendly.com')) {
                gtag('event', 'calendly_link_clicked', {
                  'event_category': 'engagement',
                  'event_label': 'calendly_booking',
                  'value': 1
                });
              }
            }, true);
          `,
        }}
      />
    </>
  );
}

export function CookieConsentManager({ gaId }: { gaId?: string }) {
  const { language } = useLanguage();
  const text = copy[language];
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [visible, setVisible] = useState(false);
  const [configuring, setConfiguring] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = readConsent();
      setConsent(saved);
      setAnalytics(saved?.analytics ?? false);
      setVisible(!saved);
    });

    const openSettings = () => {
      const latest = readConsent();
      setConsent(latest);
      setAnalytics(latest?.analytics ?? false);
      setConfiguring(true);
      setVisible(true);
    };

    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(SETTINGS_EVENT, openSettings);
  }, []);

  function choose(nextAnalytics: boolean) {
    const nextConsent = writeConsent(nextAnalytics);
    if (!nextAnalytics) {
      disableGoogleAnalytics(gaId);
    }
    setConsent(nextConsent);
    setAnalytics(nextAnalytics);
    setVisible(false);
    setConfiguring(false);
  }

  return (
    <>
      <GoogleAnalytics gaId={gaId} enabled={Boolean(consent?.analytics)} />
      {visible && (
        <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-3xl rounded border border-white/10 bg-black p-5 text-white shadow-2xl sm:p-6">
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-bold">{text.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{text.body}</p>
                <Link
                  href="/cookies"
                  className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-white/60 underline-offset-4 transition hover:text-white hover:underline"
                >
                  {text.policy}
                </Link>
              </div>

              {configuring && (
                <div className="space-y-3 border-y border-white/10 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold">{text.necessary}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/60">
                        {text.necessaryBody}
                      </p>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">
                      On
                    </span>
                  </div>
                  <label className="flex cursor-pointer items-start justify-between gap-4">
                    <span>
                      <span className="block text-sm font-bold">{text.analytics}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-white/60">
                        {text.analyticsBody}
                      </span>
                    </span>
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#880808]"
                    />
                  </label>
                </div>
              )}

              <div className="grid gap-2 sm:grid-cols-3">
                {configuring ? (
                  <button
                    type="button"
                    onClick={() => choose(analytics)}
                    className="rounded border border-white bg-white px-4 py-2 text-sm font-bold text-black transition hover:opacity-80 sm:col-span-3"
                  >
                    {text.save}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => choose(false)}
                      className="rounded border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-white"
                    >
                      {text.reject}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfiguring(true)}
                      className="rounded border border-white/25 px-4 py-2 text-sm font-bold text-white transition hover:border-white"
                    >
                      {text.configure}
                    </button>
                    <button
                      type="button"
                      onClick={() => choose(true)}
                      className="rounded border border-white bg-white px-4 py-2 text-sm font-bold text-black transition hover:opacity-80"
                    >
                      {text.accept}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function openCookieSettings() {
  window.dispatchEvent(new CustomEvent(SETTINGS_EVENT));
}
