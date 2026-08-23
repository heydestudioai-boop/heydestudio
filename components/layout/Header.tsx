'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '@/lib/language';

const spanishNavItems = [
  { label: 'Planes', href: '/planes' },
  { label: 'Casos', href: '/casos' },
  { label: 'Auditoría', href: '/audit' },
  { label: 'Estudio', href: '/estudio' },
  { label: 'Marcas', href: '/marcas' },
] as const;

const englishNavItems = [
  { label: 'Brands', href: '/marcas' },
  { label: 'Capabilities', href: '/marcas#capabilities' },
  { label: 'HEYDE Lab', href: '/marcas#heyde-lab' },
  { label: 'Real estate', href: '/en/real-estate' },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language } = useLanguage();
  const navItems = language === 'EN' ? englishNavItems : spanishNavItems;
  const homeHref =
    pathname === '/marcas' || pathname === '/contact'
      ? '/marcas'
      : pathname.startsWith('/en/')
        ? '/en/real-estate'
        : '/';
  const contactHref = language === 'EN' ? '/contact' : '/audit';
  const contactLabel =
    language === 'EN' ? 'Start a project' : 'Auditoría gratuita';

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#FAFAFA]/88 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-8">
        <Link href={homeHref} className="flex h-8 w-28 items-center" aria-label="HEYDE Studio home">
          <Image
            src="/logos/heyde-logo-nav-black.png"
            alt="HEYDE Studio"
            width={913}
            height={165}
            priority
            className="h-auto w-full object-contain"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[13px] font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-magenta'
                  : 'text-[#121212]/68 hover:text-[#121212]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <Link
            href={contactHref}
            className="rounded-sm bg-magenta px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-magenta-dark"
          >
            {contactLabel}
          </Link>
        </div>

        <button
          type="button"
          className="rounded-sm p-2 text-black md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-[#121212]/10 bg-[#FAFAFA]/96 px-6 py-5 backdrop-blur-md md:hidden">
          <div className="mb-5 flex justify-end">
            <LanguageToggle />
          </div>

          <div className="space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-magenta'
                    : 'text-[#121212]/70 hover:text-[#121212]'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href={contactHref}
              className="block rounded-sm bg-magenta px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-magenta-dark"
              onClick={() => setMobileMenuOpen(false)}
            >
              {contactLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
