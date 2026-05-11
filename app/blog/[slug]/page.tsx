import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePageContent } from '@/components/pages/ArticlePageContent';
import { articles } from '@/lib/articles';
import { createMetadata } from '@/lib/seo';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return createMetadata({
      title: 'Article Not Found | HEYDE Studio',
      description: 'The requested HEYDE Studio article could not be found.',
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return createMetadata({
    title: `${article.title} | HEYDE Studio`,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    keywords: article.category,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  if (!articles.some((article) => article.slug === slug)) {
    notFound();
  }

  return <ArticlePageContent slug={slug} />;
}
