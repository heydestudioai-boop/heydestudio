import type { Metadata } from 'next';
import { BrandInquiryPageContent } from '@/components/pages/BrandInquiryPageContent';
import { pageSeo } from '@/lib/seo';

export const metadata: Metadata = pageSeo.contact;

export default function ContactPage() {
  return <BrandInquiryPageContent />;
}
