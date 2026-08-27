// Only genuine translations belong here. The brand door is English-only.
export const LANGUAGE_PAIRS = [
  { es: '/inmobiliaria', en: '/en/real-estate' },
  { es: '/privacy', en: '/en/privacy' },
  { es: '/terms', en: '/en/terms' },
  { es: '/cookies', en: '/en/cookies' },
] as const;

export function getLanguagePair(pathname: string) {
  return LANGUAGE_PAIRS.find((pair) => pair.es === pathname || pair.en === pathname);
}
