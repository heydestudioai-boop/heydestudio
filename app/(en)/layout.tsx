import { SiteRoot, siteMetadata } from '@/components/layout/SiteRoot';

export const metadata = siteMetadata;

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteRoot lang="en">{children}</SiteRoot>;
}
