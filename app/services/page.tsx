import type { Metadata } from 'next';
import { ServicesPageContent } from '@/components/pages/ServicesPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.services;

export default function ServicesPage() {
  return <ServicesPageContent />;
}
