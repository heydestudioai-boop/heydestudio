import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';

export const metadata: Metadata = {
  title: 'Fotografia y video para bodegas en Castilla-La Mancha | HEYDE Studio',
  description: 'Campañas visuales para bodegas: producto, territorio, visita, temporada y contenido comercial.',
};

export default function BodegasPage() {
  return (
    <LocalVerticalPage
      sector="Bodegas"
      title="Tu vino tambien se vende por territorio, luz e historia."
      pain="Una bodega necesita mas que botella sobre fondo blanco: necesita producto, viñedo, proceso, visita y piezas que funcionen en venta, distribucion y enoturismo."
      packName="Campana Bodega"
      price="Desde 1.900 €"
      description="Producto, territorio, storytelling visual y piezas para web, redes, visita y venta. Es el puente natural entre contenido local y trabajo de marca."
      image="/images/s5-eden.jpg"
      area="Castilla-La Mancha y proyectos seleccionados."
    />
  );
}
