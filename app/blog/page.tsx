import type { Metadata } from 'next';
import { BlogPageContent } from '@/components/pages/BlogPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.blog;

export default function BlogPage() {
  return <BlogPageContent />;
}
