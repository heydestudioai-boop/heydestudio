import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { sectorVerticals } from '@/lib/canonical';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Fotografía y vídeo para hostelería en Toledo | HEYDE Studio',
  description: 'Contenido para restaurantes, hoteles y negocios de turismo en Toledo: carta, ambiente, reels y Google Business.',
  path: '/hosteleria',
});

export default function HosteleriaPage() {
  return <LocalVerticalPage model={sectorVerticals.hospitality} />;
}
