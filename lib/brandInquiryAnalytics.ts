export const BRAND_INQUIRY_ANALYTICS_EVENTS = [
  'brand_inquiry_view',
  'brand_inquiry_started',
  'brand_inquiry_submitted',
  'brand_inquiry_confirmation_view',
] as const;

export type BrandInquiryAnalyticsEvent =
  (typeof BRAND_INQUIRY_ANALYTICS_EVENTS)[number];

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function buildBrandInquiryAnalyticsPayload() {
  return {
    event_category: 'brand_inquiry',
    page_path: '/contact',
    locale: 'en',
  } as const;
}

export function trackBrandInquiryEvent(event: BrandInquiryAnalyticsEvent) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, buildBrandInquiryAnalyticsPayload());
}
