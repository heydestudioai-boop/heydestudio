'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';
import { openCookieSettings } from '@/components/CookieConsentManager';
import { useLanguage } from '@/lib/language';

const contact = {
  email: 'contact@heydestudio.com',
  phone: '+34671141135',
  phoneLabel: '+34 671 141 135',
} as const;

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/heyde.studio',
    icon: FaInstagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/heyde-studio',
    icon: FaLinkedinIn,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/heydestudio',
    icon: FaFacebookF,
  },
  {
    label: 'Threads',
    href: 'https://www.threads.net/@heyde.studio',
    icon: SiThreads,
  },
] as const;

const brandRoutes = new Set(['/marcas', '/contact']);

const brandFooterLinks = [
  { label: 'Capabilities', href: '/marcas#capabilities' },
  { label: 'HEYDE Lab', href: '/marcas#heyde-lab' },
  { label: 'Start a project', href: '/contact' },
] as const;

const brandStudioLinks = [
  { label: 'Local business (ES)', href: '/' },
  { label: 'Real estate', href: '/en/real-estate' },
  { label: 'Studio (ES)', href: '/estudio' },
] as const;

const localFooterLinks = [
  { label: 'Planes', href: '/planes' },
  { label: 'Casos', href: '/casos' },
  { label: 'Auditoría', href: '/audit' },
  { label: 'Estudio', href: '/estudio' },
  { label: 'Preguntas frecuentes', href: '/faq' },
] as const;

const englishLocalFooterLinks = [
  { label: 'Real estate', href: '/en/real-estate' },
  { label: 'Spanish version', href: '/inmobiliaria' },
  { label: 'Work', href: '/casos' },
  { label: 'Studio', href: '/estudio' },
  { label: 'Contact', href: '/contact' },
] as const;

const localSectorLinks = [
  { label: 'Hostelería', href: '/hosteleria' },
  { label: 'Inmobiliaria', href: '/inmobiliaria' },
  { label: 'Bodegas', href: '/bodegas' },
] as const;

const englishLocalSectorLinks = [
  { label: 'Hospitality (ES)', href: '/hosteleria' },
  { label: 'Real estate', href: '/en/real-estate' },
  { label: 'Wineries (ES)', href: '/bodegas' },
] as const;

const serviceZones = [
  'Toledo y provincia',
  'Castilla-La Mancha',
  'Madrid',
  'Costa Blanca',
] as const;

const englishServiceZones = [
  'Toledo and nearby areas',
  'Castilla-La Mancha',
  'Madrid',
  'Costa Blanca',
] as const;

export function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const isEnglishLocalRoute = pathname.startsWith('/en/');
  const isBrandRoute = brandRoutes.has(pathname);
  const footerLinks = isEnglishLocalRoute
    ? englishLocalFooterLinks
    : localFooterLinks;
  const sectorLinks = isEnglishLocalRoute
    ? englishLocalSectorLinks
    : localSectorLinks;
  const zones = isEnglishLocalRoute ? englishServiceZones : serviceZones;
  const legalLinks =
    language === 'EN'
      ? [
          { label: 'Privacy', href: '/en/privacy' },
          { label: 'Terms', href: '/en/terms' },
          { label: 'Cookies', href: '/en/cookies' },
        ]
      : [
          { label: 'Privacidad', href: '/privacy' },
          { label: 'Términos', href: '/terms' },
          { label: 'Cookies', href: '/cookies' },
        ];

  return (
    <footer className="bg-black px-8 py-12 text-white md:px-12 md:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-[1.05fr_1.9fr] md:items-start">
          <div>
            <Link
              href={isBrandRoute ? '/marcas' : '/'}
              className="mb-6 block w-36"
              aria-label="HEYDE Studio home"
            >
              <Image
                src="/logos/heyde-logo-nav-white.png"
                alt="HEYDE Studio"
                width={913}
                height={165}
                className="h-auto w-full object-contain"
              />
            </Link>
            <p className="max-w-sm whitespace-pre-line text-sm leading-relaxed text-white/70">
              {isBrandRoute
                ? 'HEYDE Studio is a hybrid content creation and social media management studio.\nThis is its advanced creative production path for brands and teams.'
                : isEnglishLocalRoute
                  ? 'HEYDE Studio — Photography, video and content for local businesses.\nToledo · Castilla-La Mancha · Madrid · Costa Blanca'
                  : 'HEYDE Studio — Fotografía, vídeo y contenido para negocios.\nToledo · Castilla-La Mancha · Madrid · Costa Blanca'}
            </p>
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                {isBrandRoute
                  ? 'Project contact'
                  : isEnglishLocalRoute
                    ? 'Direct contact'
                    : 'Contacto directo'}
              </h4>
              <div className="space-y-3 text-sm text-white/70">
                <a
                  className="block transition hover:text-white"
                  href={`mailto:${contact.email}`}
                >
                  {contact.email}
                </a>
                <a
                  className="block transition hover:text-white"
                  href={`tel:${contact.phone}`}
                >
                  {contact.phoneLabel}
                </a>
                {!isBrandRoute ? (
                  <a
                    className="block font-bold text-magenta transition hover:text-white"
                    href={
                      isEnglishLocalRoute
                        ? 'https://wa.me/34671141135?text=Hello%20HEYDE%20Studio%2C%20I%20would%20like%20to%20discuss%20content%20for%20my%20business'
                        : 'https://wa.me/34671141135?text=Hola%20HEYDE%20Studio%2C%20quiero%20preguntar%20por%20contenido%20para%20mi%20negocio'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {isEnglishLocalRoute
                      ? 'Talk on WhatsApp'
                      : 'Hablamos por WhatsApp'}
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {isBrandRoute ? (
            <div className="grid gap-10 md:grid-cols-3">
              <FooterLinkGroup
                title="Advanced production"
                links={brandFooterLinks}
              />
              <FooterLinkGroup title="One studio" links={brandStudioLinks} />
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                  Engagement
                </h4>
                <p className="mb-5 text-sm leading-relaxed text-white/70">
                  Custom projects, quoted according to scope. No mandatory
                  meeting to start.
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-bold text-magenta transition hover:text-white"
                >
                  Tell us about your project →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-3">
              <FooterLinkGroup
                title={isEnglishLocalRoute ? 'Local services' : 'Web local'}
                links={footerLinks}
              />
              <FooterLinkGroup
                title={isEnglishLocalRoute ? 'Sectors' : 'Sectores'}
                links={sectorLinks}
              />
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
                  {isEnglishLocalRoute ? 'Service area' : 'Zona de servicio'}
                </h4>
                <ul className="space-y-2">
                  {zones.map((zone) => (
                    <li key={zone} className="text-sm text-white/70">
                      {zone}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/marcas"
                  className="mt-6 block text-sm font-bold text-magenta transition hover:text-white"
                >
                  {isEnglishLocalRoute
                    ? 'Need advanced creative production? → HEYDE for brands'
                    : '¿Eres una marca y necesitas producción creativa avanzada? → HEYDE para marcas'}
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="grid items-center gap-5 md:grid-cols-3">
            <p className="text-sm text-white/60">
              © 2026 HEYDE Studio. {language === 'EN' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
            </p>
            <div className="flex justify-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  title={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 md:justify-end">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/60 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openCookieSettings}
                className="text-xs text-white/60 transition hover:text-white"
              >
                {language === 'EN' ? 'Cookie settings' : 'Configurar cookies'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
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
  );
}
