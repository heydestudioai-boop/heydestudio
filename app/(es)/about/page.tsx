import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/pages/AboutPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.about;

export default function AboutPage() {
  return <AboutPageContent />;
}
