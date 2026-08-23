import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { sectorVerticals } from '@/lib/canonical';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Fotografía y vídeo para bodegas en Castilla-La Mancha | HEYDE Studio',
  description: 'Campañas visuales para bodegas: producto, territorio, visita, temporada y contenido comercial.',
  path: '/bodegas',
});

export default function BodegasPage() {
  return <LocalVerticalPage model={sectorVerticals.wineries} />;
}
