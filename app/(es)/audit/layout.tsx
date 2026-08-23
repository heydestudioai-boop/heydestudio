import type { Metadata } from 'next';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.audit;

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
