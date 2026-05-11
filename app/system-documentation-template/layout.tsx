import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free visual system documentation template | HEYDE Studio',
  description: 'Download a practical framework for documenting identity lock, production rules, quality criteria and reusable visual system logic.',
  openGraph: {
    title: 'Free visual system documentation template',
    description: 'A practical framework to organize and document your visual system.',
    url: 'https://heyde.studio/system-documentation-template',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free visual system template',
    description: 'Document identity, production rules and reusable system logic.',
  },
};

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
