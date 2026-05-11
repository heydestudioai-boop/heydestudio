'use client';

import { LanguageToggle } from './LanguageToggle';
import { Logo } from './Logo';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex gap-8 items-center">
          {/* Navigation removed - using MinimalistHero navigation instead */}
        </nav>

        <LanguageToggle />
      </div>
    </header>
  );
}
