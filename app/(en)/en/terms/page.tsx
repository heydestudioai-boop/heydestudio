import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/pages/LegalPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.termsEn;

export default function TermsPage() {
  return <LegalPageContent type="terms" locale="en" />;
}
