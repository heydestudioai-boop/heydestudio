import { SiteRoot, siteMetadata } from '@/components/layout/SiteRoot';

export const metadata = siteMetadata;

export default function SpanishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteRoot lang="es">{children}</SiteRoot>;
}
