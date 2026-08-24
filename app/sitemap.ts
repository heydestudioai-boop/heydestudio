import type { MetadataRoute } from 'next';
import { labProjects } from '@/lib/canonical';
import { FINAL_INDEXABLE_ROUTES } from '@/lib/routePolicy';
import { siteUrl } from '@/lib/seo';

const legalAlternates: Record<string, { es: string; en: string }> = {
  '/privacy': { es: '/privacy', en: '/en/privacy' },
  '/en/privacy': { es: '/privacy', en: '/en/privacy' },
  '/terms': { es: '/terms', en: '/en/terms' },
  '/en/terms': { es: '/terms', en: '/en/terms' },
  '/cookies': { es: '/cookies', en: '/en/cookies' },
  '/en/cookies': { es: '/cookies', en: '/en/cookies' },
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = FINAL_INDEXABLE_ROUTES.map((route) => {
    const realEstateAlternates = ['/inmobiliaria', '/en/real-estate'].includes(route)
      ? {
          languages: {
            'es-ES': new URL('/inmobiliaria', siteUrl).toString(),
            en: new URL('/en/real-estate', siteUrl).toString(),
            'x-default': new URL('/inmobiliaria', siteUrl).toString(),
          },
        }
      : undefined;
    const legalPair = legalAlternates[route];
    const legalLanguageAlternates = legalPair
      ? {
          languages: {
            'es-ES': new URL(legalPair.es, siteUrl).toString(),
            en: new URL(legalPair.en, siteUrl).toString(),
            'x-default': new URL(legalPair.es, siteUrl).toString(),
          },
        }
      : undefined;

    return {
      url: new URL(route, siteUrl).toString(),
      lastModified: now,
      changeFrequency: route === '' || route === '/planes' || route === '/audit' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : ['/planes', '/audit', '/casos', '/estudio'].includes(route) ? 0.85 : 0.7,
      alternates: realEstateAlternates ?? legalLanguageAlternates,
    };
  }) satisfies MetadataRoute.Sitemap;

  const caseStudies = labProjects.map((project) => ({
    url: new URL(project.href, siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  return [...pages, ...caseStudies];
}
