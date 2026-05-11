'use client';

import { useLanguage } from '@/lib/language';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-grid grid-cols-2 rounded border border-gray-200 bg-gray-50 p-1"
      aria-label="Language selector"
    >
      {(['EN', 'ES'] as const).map((option) => {
        const isActive = language === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setLanguage(option)}
            className={`min-w-10 rounded px-3 py-1.5 text-sm font-bold transition-colors ${
              isActive
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-white hover:text-black'
            }`}
            aria-pressed={isActive}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
