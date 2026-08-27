'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackCommercialEvent, type CtaLocation } from '@/lib/commercialAnalytics';

export function CommercialTracking() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      const destination = new URL(link.href, window.location.origin);
      if (destination.protocol === 'tel:') {
        trackCommercialEvent('telefono_click');
      } else if (destination.hostname === 'wa.me' || destination.hostname === 'api.whatsapp.com') {
        trackCommercialEvent('whatsapp_click');
      } else if (destination.origin === window.location.origin && destination.pathname === '/audit') {
        const location: CtaLocation = link.closest('header') ? 'header'
          : link.closest('footer') ? 'footer'
          : link.closest('main > section:first-child') ? 'hero'
          : 'content';
        trackCommercialEvent('cta_auditoria_click', pathname, location);
      }
    }

    // One delegated listener covers server-rendered links without turning pages into clients.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/planes') return;
    const plans = document.getElementById('planes-mensuales');
    if (!plans || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.25) return;
      if (trackCommercialEvent('planes_view')) observer.disconnect();
    }, { threshold: [0.25, 0.5, 0.75, 1] });
    observer.observe(plans);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
