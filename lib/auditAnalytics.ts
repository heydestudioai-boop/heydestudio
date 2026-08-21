export const AUDIT_ANALYTICS_EVENTS = [
  'audit_view',
  'audit_started',
  'audit_submitted',
  'audit_confirmation_view',
] as const;

export type AuditAnalyticsEvent = (typeof AUDIT_ANALYTICS_EVENTS)[number];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function buildAuditAnalyticsPayload(locale: 'es' | 'en') {
  return {
    event_category: 'audit_funnel',
    page_path: '/audit',
    locale,
  } as const;
}

export function trackAuditEvent(
  event: AuditAnalyticsEvent,
  locale: 'es' | 'en'
) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, buildAuditAnalyticsPayload(locale));
}
