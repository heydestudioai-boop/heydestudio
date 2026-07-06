'use client';

import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/language';

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const isSpanishLocal = language === 'ES' && pathname !== '/marcas';

  if (!isSpanishLocal) {
    return null;
  }

  return (
    <Link
      href="https://wa.me/34671141135"
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir a HEYDE Studio por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </Link>
  );
}
