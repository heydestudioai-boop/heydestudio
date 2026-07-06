import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Fotografía y vídeo para inmobiliarias en Toledo | HEYDE Studio',
  description: 'Foto, vídeo y contenido para viviendas en Toledo y Costa Blanca. Packs cerrados para pisos, villas y alquiler vacacional.',
  path: '/inmobiliaria',
});

export default function InmobiliariaPage() {
  return (
    <LocalVerticalPage
      sector="Inmobiliaria"
      title="Las viviendas con vídeo se entienden antes."
      pain="Una vivienda no solo necesita verse limpia: necesita que el comprador imagine espacio, luz, recorrido y valor. El contenido correcto ahorra dudas y mejora la primera visita."
      packName="Pack Vivienda"
      price="220 € / villas desde 590 €"
      description="Fotografía, vídeo corto y piezas de publicación para pisos, villas y alquiler vacacional. En Costa Blanca podemos trabajar también el enfoque bilingüe ES/EN."
      image="/images/s3-solea.jpg"
      area="Toledo, Madrid y Costa Blanca."
    />
  );
}
