import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free visual system audit | HEYDE Studio',
  description: 'Book a focused 20-minute audit to find where your visual production is losing consistency, speed or control.',
  openGraph: {
    title: 'Free visual system audit | HEYDE Studio',
    description: 'Find where your visual production is losing consistency, speed or control.',
    url: 'https://heyde.studio/audit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free visual system audit',
    description: 'A focused audit for visual production, consistency and next steps.',
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
