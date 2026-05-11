export const pricingProductSlugs = [
  'avatar-system',
  'image',
  'video-reel',
  'campaign',
  'system-infrastructure',
] as const;

export type PricingProductSlug = (typeof pricingProductSlugs)[number];

export function getPricingSlug(index: number) {
  return pricingProductSlugs[index] ?? pricingProductSlugs[0];
}

export function getPricingIndex(slug: string) {
  return pricingProductSlugs.indexOf(slug as PricingProductSlug);
}

export function isPricingProductSlug(slug: string): slug is PricingProductSlug {
  return pricingProductSlugs.includes(slug as PricingProductSlug);
}
