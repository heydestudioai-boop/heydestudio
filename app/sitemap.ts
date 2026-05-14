import type { MetadataRoute } from 'next';
import { articles } from '@/lib/articles';
import { content } from '@/lib/i18n';
import { siteUrl } from '@/lib/seo';

const staticRoutes = [
  '',
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

  const pages = staticRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const blogPosts = articles.map((article) => ({
    url: new URL(`/blog/${article.slug}`, siteUrl).toString(),
    lastModified: new Date(article.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  const caseStudies = content.EN.caseStudies.cases.map((caseStudy) => ({
    url: new URL(`/case-studies/${caseStudy.slug}`, siteUrl).toString(),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  })) satisfies MetadataRoute.Sitemap;

  return [...pages, ...blogPosts, ...caseStudies];
}
