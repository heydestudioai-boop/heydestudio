import type { Metadata } from 'next';
import { LegalPageContent } from '@/components/pages/LegalPageContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | HEYDE Studio',
  description:
    'Cookie policy for HEYDE Studio, including necessary storage, analytics consent, and how to change cookie settings.',
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
  return <LegalPageContent type="cookies" />;
}
