import type { Metadata } from 'next';
import { AuditPageContent } from '@/components/pages/AuditPageContent';
import { isAuditFormEnabled } from '@/lib/auditFunnelCore';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.audit;

export default function AuditPage() {
  return <AuditPageContent formEnabled={isAuditFormEnabled(process.env)} />;
}
