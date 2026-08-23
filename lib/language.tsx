'use client';

import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';
import { type Language, siteContent } from './siteContent';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  content: (typeof siteContent)[Language];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'heyde-language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const language: Language =
    pathname === '/marcas' ||
    pathname === '/contact' ||
    pathname.startsWith('/en/')
      ? 'EN'
      : 'ES';

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage.toLowerCase();
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === 'EN' ? 'ES' : 'EN'),
      content: siteContent[language],
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }

  return context;
}
