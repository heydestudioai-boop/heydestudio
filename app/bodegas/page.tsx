import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Fotografía y vídeo para bodegas en Castilla-La Mancha | HEYDE Studio',
  description: 'Campañas visuales para bodegas: producto, territorio, visita, temporada y contenido comercial.',
  path: '/bodegas',
});

export default function BodegasPage() {
  return (
    <LocalVerticalPage
      sector="Bodegas"
      title="Tu vino también se vende por territorio, luz e historia."
      pain="Una bodega necesita más que botella sobre fondo blanco: necesita producto, viñedo, proceso, visita y piezas que funcionen en venta, distribución y enoturismo."
      packName="Campaña Bodega"
      price="Desde 1.900 €"
      description="Producto, territorio, storytelling visual y piezas para web, redes, visita y venta. Es el puente natural entre contenido local y trabajo de marca."
      image="/images/s5-eden.jpg"
      area="Castilla-La Mancha y proyectos seleccionados."
    />
  );
}
