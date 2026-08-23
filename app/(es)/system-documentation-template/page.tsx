import type { Metadata } from 'next';
import { SystemDocumentationTemplatePageContent } from '@/components/pages/SystemDocumentationTemplatePageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.template;

export default function SystemDocumentationTemplatePage() {
  return <SystemDocumentationTemplatePageContent />;
}
