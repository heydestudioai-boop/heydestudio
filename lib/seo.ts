import type { Metadata } from 'next';
import { canonicalBrand } from '@/lib/canonical';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || canonicalBrand.siteUrl;

export const siteName = 'HEYDE Studio';

interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  locale?: string;
  alternateLocale?: string[];
}

export function createMetadata({
  title,
  description,
  path = '/',
  keywords,
  noIndex = false,
  locale = 'es_ES',
  alternateLocale = ['en_US'],
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
      locale,
      alternateLocale,
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
    title: 'Contenido que hace crecer negocios locales | HEYDE Studio',
    description:
      'Fotografía, vídeo y gestión de redes para negocios locales. Una persona responsable, planes con precio visible y auditoría gratuita sin reunión previa.',
    keywords: ['fotografía Toledo', 'vídeo para negocios', 'redes sociales Toledo', 'contenido para hostelería'],
  }),
  planes: createMetadata({
    title: 'Planes y precios para negocios en Toledo | HEYDE Studio',
    description:
      'Sesión de contenido por 490 € y planes Base, Crecimiento y Dominio con precios, alcance, módulos, packs y condiciones visibles.',
    path: '/planes',
    keywords: ['planes contenido Toledo', 'fotografía comercial Toledo', 'redes sociales negocios Toledo'],
  }),
  casos: createMetadata({
    title: 'Casos y portfolio local | HEYDE Studio',
    description:
      'Portfolio de fotografía, vídeo y dirección de contenido para negocios locales, con laboratorio IA separado y etiquetado.',
    path: '/casos',
    keywords: ['portfolio fotografía Toledo', 'vídeo comercial Toledo', 'casos HEYDE Studio'],
  }),
  estudio: createMetadata({
    title: 'Estudio local en Toledo | HEYDE Studio',
    description:
      'Conoce a Oliver Heyde y el método híbrido de HEYDE Studio: una persona responsable para estrategia, contenido y redes de negocios locales.',
    path: '/estudio',
    keywords: ['Oliver Heyde', 'estudio audiovisual Toledo', 'fotógrafo Toledo'],
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
    title: 'Preguntas frecuentes sobre contenido y redes | HEYDE Studio',
    description:
      'Respuestas sobre planes, publicación, permanencia, derechos, brutos, IA, desplazamientos y auditoría gratuita de HEYDE Studio.',
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
    title: 'Auditoría gratuita para negocios locales | HEYDE Studio',
    description:
      'Pide una auditoría gratuita de foto, vídeo, redes, Google Business y web móvil. En 72 horas recibes una lectura clara.',
    path: '/audit',
    keywords: ['auditoría gratuita Toledo', 'Google Business Toledo', 'redes sociales negocios Toledo'],
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
