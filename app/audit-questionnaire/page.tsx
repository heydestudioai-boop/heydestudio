import type { Metadata } from 'next';
import { AuditQuestionnairePageContent } from '@/components/pages/AuditQuestionnairePageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.questionnaire;

export default function AuditQuestionnairePage() {
  return <AuditQuestionnairePageContent />;
}
