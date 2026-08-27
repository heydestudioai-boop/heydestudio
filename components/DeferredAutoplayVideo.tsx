'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface DeferredAutoplayVideoProps {
  src: string;
  className: string;
  ariaLabel?: string;
  decorative?: boolean;
  poster?: string;
  posterAlt?: string;
  posterPriority?: boolean;
  posterSizes?: string;
  desktopOnly?: boolean;
  absoluteFill?: boolean;
  rootMargin?: string;
}

export function DeferredAutoplayVideo({
  src,
  className,
  ariaLabel,
  decorative = false,
  poster,
  posterAlt = '',
  posterPriority = false,
  posterSizes = '100vw',
  desktopOnly = false,
  absoluteFill = false,
  rootMargin = '400px',
}: DeferredAutoplayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (desktopOnly) {
      if (!window.matchMedia('(min-width: 768px)').matches || motionPreference.matches) {
        return;
      }

      const idleWindow = window as Window & {
        requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
        cancelIdleCallback?: (id: number) => void;
      };

      if (typeof idleWindow.requestIdleCallback === 'function') {
        const idleId = idleWindow.requestIdleCallback(() => setShouldLoad(true), { timeout: 1600 });
        return () => idleWindow.cancelIdleCallback?.(idleId);
      }

      const timeoutId = globalThis.setTimeout(() => setShouldLoad(true), 600);
      return () => globalThis.clearTimeout(timeoutId);
    }

    const node = containerRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [desktopOnly, rootMargin]);

  return (
    <div
      ref={containerRef}
      className={`${absoluteFill ? '' : 'relative'} overflow-hidden ${className}`}
      aria-hidden={decorative ? 'true' : undefined}
    >
      {poster ? (
        <Image
          src={poster}
          alt={decorative ? '' : posterAlt}
          fill
          loading={posterPriority ? 'eager' : 'lazy'}
          fetchPriority={posterPriority ? 'high' : undefined}
          sizes={posterSizes}
          className="object-cover"
        />
      ) : null}

      {shouldLoad ? (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={decorative ? undefined : ariaLabel}
          onCanPlay={(event) => {
            setReady(true);
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
              event.currentTarget.pause();
            }
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
