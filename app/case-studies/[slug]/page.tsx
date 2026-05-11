import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyPageContent } from '@/components/pages/CaseStudyPageContent';
import { caseStudyContent } from '@/lib/caseStudyContent';
import { createMetadata } from '@/lib/seo';

const caseStudies = Object.values(caseStudyContent.EN);

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return createMetadata({
      title: 'Case Study Not Found | HEYDE Studio',
      description: 'The requested HEYDE Studio case study could not be found.',
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${caseStudy.name} Case Study | HEYDE Studio`,
    description: caseStudy.description,
    path: `/case-studies/${caseStudy.slug}`,
    keywords: ['case study', 'visual system', caseStudy.name],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  if (!caseStudies.some((caseStudy) => caseStudy.slug === slug)) {
    notFound();
  }

  return <CaseStudyPageContent slug={slug} />;
}
