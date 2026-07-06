import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { CookieConsentManager } from '@/components/CookieConsentManager';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { LanguageProvider } from '@/lib/language';
import { pageSeo, siteName, siteUrl } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es" data-scroll-behavior="smooth">
      <head>
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
                  description: 'Fotografia, video y redes para negocios locales, con produccion real potenciada por IA.',
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
                  jobTitle: 'Founder & Creative Director',
                  worksFor: { '@id': `${siteUrl}/#organization` },
                  url: `${siteUrl}/about`,
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
                  '@id': `${siteUrl}/services#service-list`,
                  name: 'HEYDE Studio Local Services',
                  itemListElement: [
                    'Fotografia comercial',
                    'Video para redes',
                    'Gestion de contenido',
                    'Auditoria gratuita',
                  ].map((name, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                      '@type': 'Service',
                      name,
                      provider: { '@id': `${siteUrl}/#organization` },
                      areaServed: ['Toledo', 'Castilla-La Mancha', 'Madrid', 'Costa Blanca'],
                      serviceType: 'Fotografia, video y contenido para negocios locales',
                      url: `${siteUrl}/planes`,
                    },
                  })),
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-white text-black">
        <LanguageProvider>
          <Header />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
          <ScrollToTopButton />
          <CookieConsentManager gaId={gaId} />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
