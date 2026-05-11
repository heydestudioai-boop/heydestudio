import type { Metadata } from 'next';
import { FAQPageContent } from '@/components/pages/FAQPageContent';
import { pageSeo, siteUrl } from '@/lib/seo';
import { siteContent } from '@/lib/siteContent';

export const metadata: Metadata = pageSeo.faq;

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteContent.EN.faqPage.sections.flatMap((section) =>
      section.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    ),
    url: `${siteUrl}/faq`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FAQPageContent />
    </>
  );
}
