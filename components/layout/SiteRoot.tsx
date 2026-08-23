import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { CookieConsentManager } from '@/components/CookieConsentManager';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { LanguageProvider } from '@/lib/language';
import { pageSeo, siteName, siteUrl } from '@/lib/seo';
import '@/app/globals.css';

export const siteMetadata: Metadata = {
  ...pageSeo.home,
  applicationName: siteName,
  authors: [{ name: 'HEYDE Studio' }],
  creator: 'HEYDE Studio',
  publisher: 'HEYDE Studio',
  icons: {
    icon: [
      {
        url: '/images/logo-monograma-blanco-transparente-favicon.png',
        type: 'image/png',
      },
    ],
    shortcut: '/images/logo-monograma-blanco-transparente-favicon.png',
    apple: '/images/logo-monograma-blanco-transparente-favicon.png',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export function SiteRoot({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: 'es' | 'en';
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body className="bg-white text-black">
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${siteUrl}/#organization`,
                  name: 'HEYDE Studio',
                  url: siteUrl,
                  logo: `${siteUrl}/logos/Heydestudio_Logo_Completo_Negro_Transparente.png`,
                  description: 'Fotografía, vídeo y redes para negocios locales, con producción real potenciada por IA.',
                  sameAs: [
                    'https://instagram.com/heyde.studio',
                    'https://www.linkedin.com/company/heyde-studio',
                    'https://www.facebook.com/heydestudio',
                    'https://www.threads.net/@heyde.studio',
                  ],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Sales',
                    email: 'contact@heydestudio.com',
                    telephone: '+34671141135',
                    availableLanguage: ['English', 'Spanish'],
                  },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': `${siteUrl}/#local-business`,
                  name: 'HEYDE Studio',
                  image: `${siteUrl}/images/oliver-heyde.jpeg`,
                  url: siteUrl,
                  telephone: '+34671141135',
                  email: 'contact@heydestudio.com',
                  priceRange: '€€',
                  areaServed: ['Toledo', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca'],
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Toledo',
                    addressCountry: 'ES',
                  },
                  sameAs: [
                    'https://instagram.com/heyde.studio',
                    'https://www.linkedin.com/company/heyde-studio',
                    'https://www.facebook.com/heydestudio',
                    'https://www.threads.net/@heyde.studio',
                  ],
                },
                {
                  '@type': 'Person',
                  '@id': `${siteUrl}/#oliver-heyde`,
                  name: 'Oliver Heyde',
                  jobTitle: 'Fundador y director creativo',
                  worksFor: { '@id': `${siteUrl}/#organization` },
                  url: `${siteUrl}/estudio`,
                  image: `${siteUrl}/images/oliver-heyde.jpeg`,
                  sameAs: ['https://www.linkedin.com/in/oliverheyde'],
                },
                {
                  '@type': 'WebSite',
                  '@id': `${siteUrl}/#website`,
                  name: 'HEYDE Studio',
                  url: siteUrl,
                  publisher: { '@id': `${siteUrl}/#organization` },
                  inLanguage: ['es', 'en'],
                },
                {
                  '@type': 'ItemList',
                  '@id': `${siteUrl}/planes#service-list`,
                  name: 'HEYDE Studio Local Services',
                  itemListElement: [
                    'Fotografía comercial',
                    'Vídeo para redes',
                    'Gestión de contenido',
                    'Auditoría gratuita',
                  ].map((name, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                      '@type': 'Service',
                      name,
                      provider: { '@id': `${siteUrl}/#organization` },
                      areaServed: ['Toledo', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca'],
                      serviceType: 'Fotografía, vídeo y contenido para negocios locales',
                      url: `${siteUrl}/planes`,
                    },
                  })),
                },
              ],
            }),
          }}
        />
        <LanguageProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <ScrollToTopButton />
          <CookieConsentManager gaId={gaId} />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
