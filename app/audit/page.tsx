import type { Metadata } from 'next';
import { AuditPageContent } from '@/components/pages/AuditPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.audit;

export default function AuditPage() {
  return <AuditPageContent />;
}
