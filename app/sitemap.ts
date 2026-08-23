import type { MetadataRoute } from 'next';
import { articles } from '@/lib/articles';
import { labProjects } from '@/lib/canonical';
import { siteUrl } from '@/lib/seo';

const staticRoutes = [
  '',
  '/planes',
  '/casos',
  '/estudio',
  '/hosteleria',
  '/inmobiliaria',
  '/bodegas',
  '/en/real-estate',
  '/about',
  '/audit',
  '/blog',
  '/contact',
  '/cookies',
  '/faq',
  '/privacy',
  '/resources',
  '/services',
  '/system-documentation-template',
  '/terms',
  '/work',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = staticRoutes.map((route) => {
    const realEstateAlternates = ['/inmobiliaria', '/en/real-estate'].includes(route)
      ? {
          languages: {
            'es-ES': new URL('/inmobiliaria', siteUrl).toString(),
            en: new URL('/en/real-estate', siteUrl).toString(),
            'x-default': new URL('/inmobiliaria', siteUrl).toString(),
          },
        }
      : undefined;

    return {
      url: new URL(route, siteUrl).toString(),
      lastModified: now,
      changeFrequency: route === '' || route === '/planes' || route === '/audit' ? 'weekly' : 'monthly',
      priority: route === '' ? 1 : ['/planes', '/audit', '/casos', '/estudio'].includes(route) ? 0.85 : 0.7,
      alternates: realEstateAlternates,
    };
  }) satisfies MetadataRoute.Sitemap;

  const blogPosts = articles.map((article) => ({
    url: new URL(`/blog/${article.slug}`, siteUrl).toString(),
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  const caseStudies = labProjects.map((project) => ({
    url: new URL(project.href, siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  return [...pages, ...blogPosts, ...caseStudies];
}
