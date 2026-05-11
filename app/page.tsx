import type { Metadata } from 'next';
import { HomePageContent } from '@/components/pages/HomePageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.home;

export default function Homepage() {
  return <HomePageContent />;
}
