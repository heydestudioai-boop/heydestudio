import type { Metadata } from 'next';
import { WorkPageContent } from '@/components/pages/WorkPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.work;

export default function WorkPage() {
  return <WorkPageContent />;
}
