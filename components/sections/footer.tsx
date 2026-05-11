'use client';

import React from 'react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  aboutTitle: string;
  aboutText: string;
  services: FooterLink[];
  resources: FooterLink[];
  legal: FooterLink[];
  newsletter: {
    heading: string;
    description: string;
  };
  newsletterPlaceholder: string;
  copyright: string;
}

export function Footer({
  aboutTitle,
  aboutText,
  services,
  resources,
  legal,
  newsletter,
  newsletterPlaceholder,
  copyright,
}: FooterProps) {
  return (
    <footer className="bg-black text-white px-8 py-16 md:px-12 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-4">{aboutTitle}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{aboutText}</p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {services.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/70 hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {resources.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-sm text-white/70 hover:text-white transition">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold mb-2 text-sm uppercase tracking-wider">{newsletter.heading}</h4>
            <p className="text-xs text-white/70 mb-4">{newsletter.description}</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder={newsletterPlaceholder}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm placeholder-white/50 focus:outline-none focus:border-white/50"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black font-bold text-sm rounded hover:opacity-80 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">{copyright}</p>
            <div className="flex gap-6">
              {legal.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-xs text-white/60 hover:text-white transition"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
