import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/pages/LegalPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.privacy;

export default function PrivacyPage() {
  return <LegalPageContent type="privacy" />;
}
