'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';
import { useLanguage } from '@/lib/language';
import { NewsletterSubscribeForm } from '@/components/forms/NewsletterSubscribeForm';

const socialIcons = {
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  threads: SiThreads,
} as const;

export function Footer() {
  const { content } = useLanguage();
  const footer = content.footer;

  return (
    <footer className="bg-black px-8 py-12 text-white md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_1.9fr] md:items-start">
          <div>
            <Link href="/" className="mb-6 block w-36" aria-label="HEYDE Studio home">
              <Image
                src="/logos/heyde-logo-nav-white.png"
                alt="HEYDE Studio"
                width={913}
                height={165}
                className="h-auto w-full object-contain"
              />
            </Link>
            <p className="max-w-sm whitespace-pre-line text-sm leading-relaxed text-white/70">
              {footer.aboutText}
            </p>
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {footer.contactTitle}
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <a className="block transition hover:text-white" href={`mailto:${footer.contactEmail}`}>
                  {footer.contactEmail}
                </a>
                <a className="block transition hover:text-white" href={`tel:${footer.contactPhone}`}>
                  {footer.contactPhoneLabel}
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {footer.servicesTitle}
              </h4>
              <ul className="space-y-2">
                {footer.services.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {footer.companyTitle}
              </h4>
              <ul className="space-y-2">
                {footer.company.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {footer.resourcesTitle}
              </h4>
              <ul className="space-y-2">
                {footer.resources.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider">
                {footer.newsletterTitle}
              </h4>
              <p className="mb-4 text-xs text-white/70">{footer.newsletterDescription}</p>
              <NewsletterSubscribeForm
                placeholder={footer.newsletterPlaceholder}
                submitLabel={footer.newsletterSubmit}
                successMessage={footer.newsletterSuccess}
                errorMessage={footer.newsletterError}
                source="footer_newsletter"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="grid items-center gap-5 md:grid-cols-3">
            <p className="text-sm text-white/60">{footer.copyright}</p>
            <div className="flex justify-center gap-3">
              {footer.social.map((link) => (
                (() => {
                  const Icon = socialIcons[link.icon];

                  return (
                    <a
                      key={link.href + link.label}
                      href={link.href}
                      aria-label={link.label}
                      title={link.label}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
                    >
                      <Icon aria-hidden="true" className="h-4 w-4" />
                    </a>
                  );
                })()
              ))}
            </div>
            <div className="flex justify-center gap-6 md:justify-end">
              {footer.legal.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-xs text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
