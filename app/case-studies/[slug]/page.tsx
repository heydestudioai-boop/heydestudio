import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyPageContent } from '@/components/pages/CaseStudyPageContent';
import { getLabProject, labProjects } from '@/lib/canonical';
import { createMetadata } from '@/lib/seo';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return labProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getLabProject(slug);

  if (!project) {
    return createMetadata({
      title: 'Proyecto HEYDE Lab no encontrado | HEYDE Studio',
      description: 'El proyecto autoiniciado solicitado no está disponible.',
      path: `/case-studies/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${project.name} — Proyecto autoiniciado HEYDE Lab | HEYDE Studio`,
    description: project.summary,
    path: project.href,
    keywords: ['HEYDE Lab', 'proyecto autoiniciado', project.name],
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  if (!getLabProject(slug)) {
    notFound();
  }

  return <CaseStudyPageContent slug={slug} />;
}
