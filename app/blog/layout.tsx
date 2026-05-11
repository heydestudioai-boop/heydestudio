import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes on visual systems | HEYDE Studio',
  description: 'Essays on visual systems, AI-assisted production, campaign logic, identity continuity and scalable image production.',
  openGraph: {
    title: 'Notes on visual systems | HEYDE Studio',
    description: 'Essays on campaign logic, identity continuity and scalable visual production.',
    url: 'https://heyde.studio/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEYDE Studio notes',
    description: 'Visual systems, campaign logic and AI-assisted production.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
