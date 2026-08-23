import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { sectorVerticals } from '@/lib/canonical';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Fotografía y vídeo para inmobiliarias en Toledo | HEYDE Studio',
  description: 'Foto, vídeo y contenido para viviendas en Toledo y Costa Blanca. Packs cerrados para pisos, villas y alquiler vacacional.',
  path: '/inmobiliaria',
  languages: {
    'es-ES': '/inmobiliaria',
    en: '/en/real-estate',
    'x-default': '/inmobiliaria',
  },
});

export default function InmobiliariaPage() {
  return <LocalVerticalPage model={sectorVerticals.realEstateEs} />;
}
