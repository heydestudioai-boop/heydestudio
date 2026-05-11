'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLineBreaksHTML } from '@/lib/formatters';

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  headline?: string;
  subheadline?: string;
  body?: string;
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  mainText?: string;
  readMoreLink?: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <a
    href={href}
    onClick={onClick}
    className="px-4 py-2 text-sm font-medium tracking-widest text-foreground border border-foreground/20 rounded transition-all duration-300 hover:border-foreground hover:bg-foreground/5 active:bg-foreground/10"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  headline,
  subheadline,
  body,
  ctaPrimary,
  ctaPrimaryLink = "#contact",
  ctaSecondary,
  ctaSecondaryLink,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider cursor-pointer hover:opacity-80 transition-opacity"
        >
          <a href="#top">{logoText}</a>
        </motion.div>

        <div className="hidden items-center space-x-4 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col space-y-1.5 md:hidden relative w-8 h-8 justify-center items-center"
          aria-label="Open menu"
        >
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col space-y-1.5"
              >
                <span className="block h-0.5 w-6 bg-foreground"></span>
                <span className="block h-0.5 w-6 bg-foreground"></span>
                <span className="block h-0.5 w-5 bg-foreground"></span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-24 left-0 right-0 z-20 bg-background border-b border-foreground/10 md:hidden"
          >
            <nav className="flex flex-col space-y-3 p-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="z-20 order-2 md:order-1 text-center md:text-left max-w-xl"
        >
          {headline && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
              {headline}
            </h1>
          )}
          {subheadline && (
            <h2 className="text-xl md:text-2xl text-foreground/70 mb-6 font-normal">
              {subheadline}
            </h2>
          )}
          {body && (
            <p className="text-lg leading-relaxed text-foreground/80 mb-8 max-w-md" dangerouslySetInnerHTML={getLineBreaksHTML(body)}></p>
          )}
          {ctaPrimary && (
            <a
              href={ctaPrimaryLink}
              className="inline-block px-8 py-3 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors mr-4"
            >
              {ctaPrimary}
            </a>
          )}
          {ctaSecondary && (
            <a
              href={ctaSecondaryLink}
              className="inline-block text-sm text-foreground/70 hover:text-foreground transition-colors mt-4 md:mt-0"
            >
              {ctaSecondary}
            </a>
          )}
          {mainText && !headline && (
            <>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0" dangerouslySetInnerHTML={getLineBreaksHTML(mainText)}></p>
              <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font hover:opacity-70 transition-opacity">
                Read More
              </a>
            </>
          )}
        </motion.div>

        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
          ></motion.div>
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-56 object-cover md:w-64 scale-150 lg:w-72"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop';
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
