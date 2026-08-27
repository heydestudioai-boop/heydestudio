export const COMMERCIAL_ANALYTICS_EVENTS = [
  'cta_auditoria_click',
  'form_auditoria_start',
  'form_auditoria_submit',
  'whatsapp_click',
  'telefono_click',
  'planes_view',
] as const;

export type CommercialAnalyticsEvent = (typeof COMMERCIAL_ANALYTICS_EVENTS)[number];
export type CtaLocation = 'header' | 'hero' | 'content' | 'footer' | 'floating';

// A closed list prevents query strings, user URLs or identifiers entering GA.
const SOURCE_PATHS = new Set([
  '/', '/planes', '/audit', '/casos', '/estudio', '/hosteleria', '/inmobiliaria',
  '/bodegas', '/en/real-estate', '/marcas', '/contact', '/faq', '/privacy',
  '/terms', '/cookies', '/en/privacy', '/en/terms', '/en/cookies', '/blog',
  '/case-studies/solea', '/case-studies/eden', '/case-studies/motion',
]);
const CTA_LOCATIONS = new Set<CtaLocation>(['header', 'hero', 'content', 'footer', 'floating']);

export function buildCommercialAnalyticsPayload(
  event: CommercialAnalyticsEvent,
  sourcePath?: string,
  ctaLocation?: CtaLocation
) {
  if (event !== 'cta_auditoria_click') return {};
  return {
    source_path: sourcePath && SOURCE_PATHS.has(sourcePath) ? sourcePath : 'other',
    cta_location: ctaLocation && CTA_LOCATIONS.has(ctaLocation) ? ctaLocation : 'content',
  };
}

export function trackCommercialEvent(
  event: CommercialAnalyticsEvent,
  sourcePath?: string,
  ctaLocation?: CtaLocation
): boolean {
  if (typeof window === 'undefined' || !COMMERCIAL_ANALYTICS_EVENTS.includes(event)) return false;
  try {
    const consent = JSON.parse(window.localStorage.getItem('heyde-cookie-consent') || 'null');
    // Use the existing consent decision. Do not queue events while consent is absent/revoked.
    if (consent?.analytics !== true || typeof consent.decidedAt !== 'string' || !window.gtag) return false;
    window.gtag('event', event, buildCommercialAnalyticsPayload(event, sourcePath, ctaLocation));
    return true;
  } catch {
    return false;
  }
}
