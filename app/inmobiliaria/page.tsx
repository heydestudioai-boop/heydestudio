import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';

export const metadata: Metadata = {
  title: 'Fotografia y video para inmobiliarias en Toledo | HEYDE Studio',
  description: 'Foto, video y contenido para viviendas en Toledo y Costa Blanca. Packs cerrados para pisos, villas y alquiler vacacional.',
};

export default function InmobiliariaPage() {
  return (
    <LocalVerticalPage
      sector="Inmobiliaria"
      title="Las viviendas con video se entienden antes."
      pain="Una vivienda no solo necesita verse limpia: necesita que el comprador imagine espacio, luz, recorrido y valor. El contenido correcto ahorra dudas y mejora la primera visita."
      packName="Pack Vivienda"
      price="220 € / villas desde 590 €"
      description="Fotografia, video corto y piezas de publicacion para pisos, villas y alquiler vacacional. En Costa Blanca podemos trabajar tambien el enfoque bilingue ES/EN."
      image="/images/s3-solea.jpg"
      area="Toledo, Madrid y Costa Blanca."
    />
  );
}
