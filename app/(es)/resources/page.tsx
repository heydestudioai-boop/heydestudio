import type { Metadata } from 'next';
import { ResourcesPageContent } from '@/components/pages/ResourcesPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.resources;

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}
