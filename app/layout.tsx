import type { Metadata } from 'next';
import Script from 'next/script';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
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
        url: '/images/logo-monograma-blanco-transparente.png',
        type: 'image/png',
      },
    ],
    shortcut: '/images/logo-monograma-blanco-transparente.png',
    apple: '/images/logo-monograma-blanco-transparente.png',
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
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');

              // Track Calendly link clicks
              document.addEventListener('click', function(e) {
                var target = e.target && e.target.closest ? e.target.closest('a') : null;
                if (target && target.href && target.href.includes('calendly.com')) {
                  gtag('event', 'calendly_link_clicked', {
                    'event_category': 'engagement',
                    'event_label': 'calendly_booking',
                    'value': 1
                  });
                }
              }, true);
            `,
              }}
            />
          </>
        )}

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
                  description: 'AI Visual Systems for Modern Brands',
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
                  inLanguage: ['en', 'es'],
                },
                {
                  '@type': 'ItemList',
                  '@id': `${siteUrl}/services#service-list`,
                  name: 'HEYDE Studio Services',
                  itemListElement: [
                    'Avatar',
                    'Image',
                    'Video / Reel',
                    'Campaign',
                    'System / Infrastructure',
                  ].map((name, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                      '@type': 'Service',
                      name,
                      provider: { '@id': `${siteUrl}/#organization` },
                      areaServed: 'Worldwide',
                      serviceType: 'AI visual systems and campaign production',
                      url: `${siteUrl}/services`,
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
        </LanguageProvider>
      </body>
    </html>
  );
}
