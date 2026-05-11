import type { Metadata } from 'next';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://heydestudio.com';

export const siteName = 'HEYDE Studio';

interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function createMetadata({
  title,
  description,
  path = '/',
  keywords,
  noIndex = false,
}: SeoConfig): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['es_ES'],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const pageSeo = {
  home: createMetadata({
    title: 'HEYDE Studio | AI Visual Systems for Modern Brands',
    description:
      'Build scalable AI visual systems for modern brands. Documented, controlled, and ready to deploy.',
  }),
  about: createMetadata({
    title: 'About HEYDE Studio | Visual Systems for Modern Brands',
    description:
      'Learn the philosophy behind HEYDE Studio: creative direction, AI systems, and visual infrastructure for modern brands.',
    path: '/about',
    keywords: ['HEYDE Studio', 'visual systems', 'creative direction', 'AI brand systems'],
  }),
  services: createMetadata({
    title: 'Services, Process & Pricing | HEYDE Studio',
    description:
      'Explore HEYDE Studio services, process, timelines, pricing levels, and AI visual infrastructure for modern brands.',
    path: '/services',
    keywords: ['visual systems', 'AI campaigns', 'brand infrastructure', 'pricing', 'process'],
  }),
  work: createMetadata({
    title: 'Work | HEYDE Studio',
    description:
      'Explore concept systems, visual studies, and production frameworks built to test campaign logic and scalable AI production.',
    path: '/work',
    keywords: ['case studies', 'visual systems', 'brand systems', 'AI production'],
  }),
  process: createMetadata({
    title: 'Process | HEYDE Studio',
    description:
      'A clear methodology for building visual systems: discover, design, build, document, and deploy.',
    path: '/process',
    keywords: ['visual system process', 'design methodology', 'AI implementation'],
  }),
  pricing: createMetadata({
    title: 'Pricing | HEYDE Studio',
    description:
      'Transparent pricing for visual production, AI campaigns, avatars, and complete brand systems.',
    path: '/pricing',
    keywords: ['pricing', 'visual systems pricing', 'AI infrastructure pricing'],
  }),
  resources: createMetadata({
    title: 'Resources | HEYDE Studio',
    description:
      'Free templates, guides, and practical resources for building scalable visual systems.',
    path: '/resources',
    keywords: ['visual system template', 'brand guidelines template', 'free resources'],
  }),
  blog: createMetadata({
    title: 'Blog | HEYDE Studio',
    description:
      'Articles on visual systems, AI production, fashion imagery, and scalable brand infrastructure.',
    path: '/blog',
    keywords: ['visual systems blog', 'AI fashion imagery', 'brand infrastructure'],
  }),
  faq: createMetadata({
    title: 'FAQ | HEYDE Studio',
    description:
      'Answers about visual systems, timelines, pricing, implementation, and working with HEYDE Studio.',
    path: '/faq',
    keywords: ['FAQ', 'visual systems', 'pricing', 'implementation'],
  }),
  contact: createMetadata({
    title: 'Contact | HEYDE Studio',
    description:
      'Tell HEYDE Studio what you are building and start a conversation about your visual system.',
    path: '/contact',
  }),
  audit: createMetadata({
    title: 'Free Visual System Audit | HEYDE Studio',
    description:
      'Schedule a free 20-minute visual system audit and learn where your brand can improve production, consistency, and scale.',
    path: '/audit',
  }),
  questionnaire: createMetadata({
    title: 'Audit Questionnaire | HEYDE Studio',
    description: 'Private pre-audit questionnaire for scheduled HEYDE Studio clients.',
    path: '/audit-questionnaire',
    noIndex: true,
  }),
  template: createMetadata({
    title: 'System Documentation Template | HEYDE Studio',
    description:
      'Download a practical template for documenting visual systems, identity locks, rules, quality control, and production notes.',
    path: '/system-documentation-template',
    keywords: ['system documentation template', 'visual system template', 'brand documentation'],
  }),
  privacy: createMetadata({
    title: 'Privacy Policy | HEYDE Studio',
    description:
      'Privacy policy for HEYDE Studio, including how contact, analytics, and integration data are handled.',
    path: '/privacy',
  }),
  terms: createMetadata({
    title: 'Terms | HEYDE Studio',
    description:
      'Terms of use for the HEYDE Studio website, resources, forms, and service enquiries.',
    path: '/terms',
  }),
};
