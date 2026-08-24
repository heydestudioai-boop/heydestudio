import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/pages/LegalPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.cookiesEn;

export default function CookiesPage() {
  return <LegalPageContent type="cookies" locale="en" />;
}
