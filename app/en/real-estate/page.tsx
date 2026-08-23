import type { Metadata } from 'next';
import { LocalVerticalPage } from '@/components/pages/LocalVerticalPage';
import { sectorVerticals } from '@/lib/canonical';
import { createMetadata } from '@/lib/seo';

export const metadata: Metadata = createMetadata({
  title: 'Real estate photography and video in Spain | HEYDE Studio',
  description:
    'Photography, video and social assets for properties in Toledo, Madrid and Costa Blanca, with clear packs for homes and premium villas.',
  path: '/en/real-estate',
  locale: 'en_GB',
  alternateLocale: ['es_ES'],
  languages: {
    'es-ES': '/inmobiliaria',
    en: '/en/real-estate',
    'x-default': '/inmobiliaria',
  },
});

export default function RealEstatePage() {
  return <LocalVerticalPage model={sectorVerticals.realEstateEn} />;
}
