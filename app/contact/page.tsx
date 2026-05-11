import type { Metadata } from 'next';
import { ContactPageContent } from '@/components/pages/ContactPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.contact;

export default function ContactPage() {
  return <ContactPageContent />;
}
