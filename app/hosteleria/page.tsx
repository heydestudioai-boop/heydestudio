import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Fotografía y vídeo para hostelería en Toledo | HEYDE Studio',
  description: 'Contenido para restaurantes, hoteles y negocios de turismo en Toledo: carta, ambiente, reels y Google Business.',
  path: '/hosteleria',
});

export default function HosteleriaPage() {
  return (
    <LocalVerticalPage
      sector="Hostelería y turismo"
      title="Tu carta merece mejores fotos que las del móvil."
      pain="Restaurantes y hoteles compiten antes de la reserva: en Google, Instagram y WhatsApp. Si la primera impresión no abre apetito o confianza, el cliente sigue buscando."
      packName="Pack Carta"
      price="490 €"
      description="Fotos de platos, ambiente y piezas listas para relanzar carta, temporada o reservas. Pensado para que el contenido trabaje en redes, ficha de Google y web."
      image="/images/s2-problema.jpg"
      area="Toledo, provincia y escapadas de temporada."
    />
  );
}
