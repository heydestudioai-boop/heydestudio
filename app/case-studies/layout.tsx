import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | HEYDE Studio | Visual Systems in Action',
  description: 'Explore HEYDE Studio concept systems and self-initiated studies built to demonstrate campaign logic, identity consistency, and scalable AI production.',
  openGraph: {
    title: 'Case Studies | HEYDE Studio',
    description: 'Concept systems and visual studies built around reusable production logic.',
    url: 'https://heydestudio.com/case-studies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEYDE Case Studies',
    description: 'Concept systems and visual studies built around reusable production logic.',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
