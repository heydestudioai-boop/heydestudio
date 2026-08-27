'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLanguagePair } from '@/lib/languageRoutes';

export function LanguageToggle() {
  const pathname = usePathname();
  const pair = getLanguagePair(pathname);
  if (!pair) return null;

  return (
    <div
      className="inline-grid grid-cols-2 rounded border border-gray-200 bg-gray-50 p-1"
      role="group"
      aria-label={pathname === pair.en ? 'Language' : 'Idioma'}
    >
      {(['EN', 'ES'] as const).map((option) => {
        const href = option === 'EN' ? pair.en : pair.es;
        const isActive = pathname === href;

        return (
          <Link
            key={option}
            href={href}
            hrefLang={option.toLowerCase()}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded px-3 text-sm font-bold transition-colors ${
              isActive
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-white hover:text-black'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {option}
          </Link>
        );
      })}
    </div>
  );
}
