import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEYDE Lab | Proyectos autoiniciados | HEYDE Studio',
  description: 'Proyectos autoiniciados de HEYDE Lab: pruebas de capacidad creativa que no representan clientes ni resultados comerciales.',
  openGraph: {
    title: 'HEYDE Lab | HEYDE Studio',
    description: 'Proyectos autoiniciados, identificados como no clientes.',
    url: 'https://www.heydestudio.com/case-studies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEYDE Lab',
    description: 'Proyectos autoiniciados, identificados como no clientes.',
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
