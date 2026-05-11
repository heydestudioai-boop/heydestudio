import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How HEYDE Studio Works | Visual Systems Process',
  description: 'The 5-step HEYDE process: Identity Lock, System Construction, Generation, Quality Control, Documentation Handoff. 10 days start to finish.',
  openGraph: {
    title: 'How HEYDE Studio Works | Visual Systems Process',
    description: 'Learn how we build visual systems in 10 days with proven methodology.',
    url: 'https://heyde.studio/services#process',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How We Build Visual Systems',
    description: 'The HEYDE 5-step process explained.',
  },
};

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
