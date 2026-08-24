import type { Metadata } from 'next';
import { canonicalBrand } from '@/lib/canonical';

// Canonicals, sitemap and structured data must always point to the approved public host.
// Environment URLs can identify a runtime, but must not redefine the business canonical.
export const siteUrl = canonicalBrand.siteUrl;

export const siteName = 'HEYDE Studio';

interface SeoConfig {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  locale?: string;
  alternateLocale?: string[];
  languages?: Record<string, string>;
}

export function createMetadata({
  title,
  description,
  path = '/',
  keywords,
  noIndex = false,
  locale = 'es_ES',
  alternateLocale = ['en_US'],
  languages,
}: SeoConfig): Metadata {
  const url = new URL(path, siteUrl).toString();
  const languageAlternates = languages
    ? Object.fromEntries(
        Object.entries(languages).map(([language, languagePath]) => [
          language,
          new URL(languagePath, siteUrl).toString(),
        ])
      )
    : undefined;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: languageAlternates,
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
    title: 'Fotografía, vídeo y redes sociales en Toledo | HEYDE Studio',
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
    title: 'Proceso de producción audiovisual y HEYDE Lab | HEYDE Studio',
    description:
      'Conoce el proceso de fotografía, vídeo y contenido de HEYDE Studio y los proyectos autoiniciados de HEYDE Lab, siempre separados del trabajo de cliente.',
    path: '/casos',
    keywords: ['proceso producción audiovisual', 'portfolio creativo Toledo', 'HEYDE Lab'],
  }),
  estudio: createMetadata({
    title: 'Estudio local en Toledo | HEYDE Studio',
    description:
      'Conoce a Oliver Heyde y el método híbrido de HEYDE Studio: una persona responsable para estrategia, contenido y redes de negocios locales.',
    path: '/estudio',
    keywords: ['Oliver Heyde', 'estudio audiovisual Toledo', 'fotógrafo Toledo'],
  }),
  blog: createMetadata({
    title: 'Archivo editorial | HEYDE Studio',
    description:
      'El archivo editorial de HEYDE Studio está en revisión. Consulta la oferta actual y HEYDE Lab desde las páginas canónicas.',
    path: '/blog',
    noIndex: true,
  }),
  faq: createMetadata({
    title: 'Preguntas frecuentes sobre contenido y redes | HEYDE Studio',
    description:
      'Respuestas sobre planes, publicación, permanencia, derechos, brutos, IA, desplazamientos y auditoría gratuita de HEYDE Studio.',
    path: '/faq',
    keywords: ['preguntas contenido Toledo', 'planes contenido', 'derechos de uso'],
  }),
  contact: createMetadata({
    title: 'Start a creative production project | HEYDE Studio',
    description:
      'Tell HEYDE Studio about your campaign, production or advanced content project. A short English project inquiry with no mandatory meeting.',
    path: '/contact',
    locale: 'en_US',
    alternateLocale: ['es_ES'],
  }),
  audit: createMetadata({
    title: 'Auditoría gratuita para negocios locales | HEYDE Studio',
    description:
      'Pide una auditoría gratuita de foto, vídeo, redes, Google Business y web móvil. En 72 horas recibes una lectura clara.',
    path: '/audit',
    keywords: ['auditoría gratuita Toledo', 'Google Business Toledo', 'redes sociales negocios Toledo'],
  }),
  privacy: createMetadata({
    title: 'Política de privacidad | HEYDE Studio',
    description:
      'Tratamiento actual de solicitudes de auditoría y proyecto, proveedores técnicos, analítica opcional y derechos de privacidad en HEYDE Studio.',
    path: '/privacy',
    alternateLocale: ['en_GB'],
    languages: {
      'es-ES': '/privacy',
      en: '/en/privacy',
      'x-default': '/privacy',
    },
  }),
  terms: createMetadata({
    title: 'Términos de uso | HEYDE Studio',
    description:
      'Condiciones de uso de la web, solicitudes, precios, planes, entregables, desplazamientos, IA y oferta de lanzamiento de HEYDE Studio.',
    path: '/terms',
    alternateLocale: ['en_GB'],
    languages: {
      'es-ES': '/terms',
      en: '/en/terms',
      'x-default': '/terms',
    },
  }),
  cookies: createMetadata({
    title: 'Política de cookies | HEYDE Studio',
    description:
      'Almacenamiento local necesario, consentimiento de Google Analytics y revocación de cookies en HEYDE Studio.',
    path: '/cookies',
    alternateLocale: ['en_GB'],
    languages: {
      'es-ES': '/cookies',
      en: '/en/cookies',
      'x-default': '/cookies',
    },
  }),
  privacyEn: createMetadata({
    title: 'Privacy policy | HEYDE Studio',
    description:
      'How HEYDE Studio handles local audit and brand inquiries, legal bases, retention, providers, analytics and privacy rights.',
    path: '/en/privacy',
    locale: 'en_GB',
    alternateLocale: ['es_ES'],
    languages: {
      'es-ES': '/privacy',
      en: '/en/privacy',
      'x-default': '/privacy',
    },
  }),
  termsEn: createMetadata({
    title: 'Terms of use | HEYDE Studio',
    description:
      'Website use, inquiries, prices, VAT, deliverables, travel, AI, launch offer and applicable law for HEYDE Studio.',
    path: '/en/terms',
    locale: 'en_GB',
    alternateLocale: ['es_ES'],
    languages: {
      'es-ES': '/terms',
      en: '/en/terms',
      'x-default': '/terms',
    },
  }),
  cookiesEn: createMetadata({
    title: 'Cookie policy | HEYDE Studio',
    description:
      'Necessary local storage, Google Analytics consent, cookie lifetimes and withdrawal controls on the HEYDE Studio website.',
    path: '/en/cookies',
    locale: 'en_GB',
    alternateLocale: ['es_ES'],
    languages: {
      'es-ES': '/cookies',
      en: '/en/cookies',
      'x-default': '/cookies',
    },
  }),
};
