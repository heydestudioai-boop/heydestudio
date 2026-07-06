import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';

export const metadata: Metadata = {
  title: 'Fotografia y video para hosteleria en Toledo | HEYDE Studio',
  description: 'Contenido para restaurantes, hoteles y negocios de turismo en Toledo: carta, ambiente, reels y Google Business.',
};

export default function HosteleriaPage() {
  return (
    <LocalVerticalPage
      sector="Hosteleria y turismo"
      title="Tu carta merece mejores fotos que las del movil."
      pain="Restaurantes y hoteles compiten antes de la reserva: en Google, Instagram y WhatsApp. Si la primera impresion no abre apetito o confianza, el cliente sigue buscando."
      packName="Pack Carta"
      price="490 €"
      description="Fotos de platos, ambiente y piezas listas para relanzar carta, temporada o reservas. Pensado para que el contenido trabaje en redes, ficha de Google y web."
      image="/images/s2-problema.jpg"
      area="Toledo, provincia y escapadas de temporada."
    />
  );
}
