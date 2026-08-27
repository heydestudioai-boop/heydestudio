'use client';

import Script from 'next/script';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
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
    necessary: 'Necessary storage',
    necessaryBody:
      'Local storage remembers language and consent choices. Always active.',
    alwaysOn: 'On',
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
    necessary: 'Almacenamiento necesario',
    necessaryBody:
      'El almacenamiento local recuerda el idioma y el consentimiento. Siempre activo.',
    alwaysOn: 'Activo',
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

  const cookieNames = ['_ga', '_gid', '_gat'];
  if (gaId) cookieNames.push(`_ga_${gaId.replace(/^G-/, '')}`);
  cookieNames.forEach(deleteCookie);
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
  const bannerRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLInputElement>(null);
  const settingsTrigger = useRef<HTMLElement | null>(null);

  // Layout/focus only: consent storage, categories and GA gating stay unchanged.
  useEffect(() => {
    const banner = bannerRef.current;
    if (!visible || !banner) return;
    const resize = new ResizeObserver(() => {
      document.documentElement.style.setProperty('--cookie-banner-height', `${banner.offsetHeight}px`);
    });
    resize.observe(banner);
    if (configuring) analyticsRef.current?.focus();
    return () => {
      resize.disconnect();
      document.documentElement.style.removeProperty('--cookie-banner-height');
    };
  }, [visible, configuring]);

  useEffect(() => {
    queueMicrotask(() => {
      const saved = readConsent();
      setConsent(saved);
      setAnalytics(saved?.analytics ?? false);
      setVisible(!saved);
    });

    const openSettings = () => {
      settingsTrigger.current = document.activeElement as HTMLElement | null;
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
    settingsTrigger.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <GoogleAnalytics gaId={gaId} enabled={Boolean(consent?.analytics)} />
      {visible && (
        <div
          ref={bannerRef}
          data-cookie-banner
          data-configuring={configuring}
          role="region"
          aria-labelledby="cookie-settings-title"
          className="cookie-banner fixed inset-x-0 bottom-0 z-[70] max-h-[75dvh] overflow-y-auto border-t border-white/20 bg-black px-4 py-3 text-white shadow-2xl sm:px-6"
        >
          <div className="mx-auto max-w-7xl">
            <div className={`grid gap-3 ${configuring ? '' : 'md:grid-cols-[1fr_auto] md:items-center md:gap-x-8'}`}>
              <div>
                <h2 id="cookie-settings-title" className="text-base font-bold">{text.title}</h2>
                <p className="mt-1 max-w-3xl text-[13px] leading-[1.4] text-white/70">{text.body}</p>
                <Link
                  href={language === 'EN' ? '/en/cookies' : '/cookies'}
                  className="mt-1 inline-block py-1 text-xs font-bold text-white/70 underline underline-offset-4 transition hover:text-white"
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
                      {text.alwaysOn}
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
                      ref={analyticsRef}
                      type="checkbox"
                      checked={analytics}
                      onChange={(event) => setAnalytics(event.target.checked)}
                      className="mt-1 h-5 w-5 accent-[#880808]"
                    />
                  </label>
                </div>
              )}

              <div className="grid grid-cols-3 gap-2">
                {configuring ? (
                  <button
                    type="button"
                    onClick={() => choose(analytics)}
                    className="col-span-3 min-h-11 rounded border border-white bg-white px-4 py-2 text-sm font-bold text-black transition hover:opacity-80"
                  >
                    {text.save}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => choose(false)}
                      className="min-h-11 rounded border border-white bg-white px-3 py-2 text-sm font-bold text-black transition hover:opacity-80"
                    >
                      {text.reject}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfiguring(true)}
                      className="min-h-11 rounded border border-white bg-white px-3 py-2 text-sm font-bold text-black transition hover:opacity-80"
                    >
                      {text.configure}
                    </button>
                    <button
                      type="button"
                      onClick={() => choose(true)}
                      className="min-h-11 rounded border border-white bg-white px-3 py-2 text-sm font-bold text-black transition hover:opacity-80"
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
