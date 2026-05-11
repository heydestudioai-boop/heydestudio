import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductPricingPageContent } from '@/components/pages/ProductPricingPageContent';
import {
  getPricingIndex,
  isPricingProductSlug,
  pricingProductSlugs,
} from '@/lib/pricingProducts';
import { siteContent } from '@/lib/siteContent';
import { createMetadata } from '@/lib/seo';

interface ProductPricingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return pricingProductSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPricingPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isPricingProductSlug(slug)) {
    return createMetadata({
      title: 'Pricing Not Found | HEYDE Studio',
      description: 'The requested HEYDE Studio pricing page could not be found.',
      path: `/pricing/${slug}`,
      noIndex: true,
    });
  }

  const index = getPricingIndex(slug);
  const service = siteContent.EN.servicesPage.services[index];
  const product = siteContent.EN.pricingPage.products[index];

  return createMetadata({
    title: `${service.title.replace(/^\d+\.\s*/, '')} Catalog | HEYDE Studio`,
    description: `${product.description} ${service.priceNote}`,
    path: `/pricing/${slug}`,
    keywords: ['pricing', 'catalog', 'visual systems', product.name],
  });
}

export default async function ProductPricingPage({ params }: ProductPricingPageProps) {
  const { slug } = await params;

  if (!isPricingProductSlug(slug)) {
    notFound();
  }

  return <ProductPricingPageContent slug={slug} />;
}
