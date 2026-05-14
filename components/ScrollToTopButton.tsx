'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 480);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      aria-label="Volver arriba"
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-sm border border-magenta bg-[#121212] text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition-all duration-300 hover:bg-magenta focus:outline-none focus:ring-2 focus:ring-magenta focus:ring-offset-2 focus:ring-offset-[#FAFAFA] md:bottom-7 md:right-7 ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp aria-hidden="true" size={20} strokeWidth={2.2} />
    </button>
  );
}
