'use client';

import { useState } from 'react';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: readonly AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-px overflow-hidden rounded-sm border border-gray-200 bg-gray-200">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="overflow-hidden bg-white"
        >
          <button
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className="flex w-full items-center justify-between bg-white px-6 py-5 transition-colors hover:bg-gray-50"
          >
            <h3 className="text-left font-bold text-gray-900">{item.question}</h3>
            <span className="ml-4 flex-shrink-0 text-2xl font-bold leading-none text-magenta">
              {openIndex === idx ? '−' : '+'}
            </span>
          </button>
          {openIndex === idx && (
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-5">
              <p className="leading-relaxed text-gray-700">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
