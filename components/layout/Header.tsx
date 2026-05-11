'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/language';
import { LanguageToggle } from './LanguageToggle';

const navItems = [
  { key: 'work', href: '/work' },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'resources', href: '/resources' },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { content } = useLanguage();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#FAFAFA]/88 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-8">
        <Link href="/" className="flex h-8 w-28 items-center" aria-label="HEYDE Studio home">
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
              {content.nav[item.key]}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <Link
            href="/contact"
            className="rounded-sm bg-magenta px-4 py-2 text-[13px] font-bold text-white transition-colors hover:bg-magenta-dark"
          >
            {content.nav.contact}
          </Link>
          <Link
            href="/audit"
            className="rounded-sm border border-magenta px-4 py-2 text-[13px] font-bold text-magenta transition-colors hover:bg-magenta hover:text-white"
          >
            {content.nav.audit}
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
                {content.nav[item.key]}
              </Link>
            ))}

            <Link
              href="/contact"
              className="block rounded-sm bg-magenta px-5 py-3 text-center text-sm font-bold text-white transition-colors hover:bg-magenta-dark"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.nav.contact}
            </Link>
            <Link
              href="/audit"
              className="block rounded-sm border border-magenta px-5 py-3 text-center text-sm font-bold text-magenta transition-colors hover:bg-magenta hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {content.nav.audit}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
