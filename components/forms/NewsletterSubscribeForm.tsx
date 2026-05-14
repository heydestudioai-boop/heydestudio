'use client';

import { useState } from 'react';

type Tone = 'footer' | 'panel';

interface NewsletterSubscribeFormProps {
  placeholder: string;
  submitLabel: string;
  successMessage?: string;
  errorMessage?: string;
  source?: string;
  tone?: Tone;
}

export function NewsletterSubscribeForm({
  placeholder,
  submitLabel,
  successMessage = 'Subscribed. Welcome in.',
  errorMessage = 'Could not subscribe right now. Please try again.',
  source = 'website_newsletter',
  tone = 'footer',
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isFooter = tone === 'footer';
  const inputClass = isFooter
    ? 'rounded border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/50 focus:border-white/50 focus:outline-none'
    : 'w-full rounded border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/40 transition focus:border-magenta focus:bg-white/10 focus:outline-none';
  const buttonClass = isFooter
    ? 'rounded bg-white px-4 py-2 text-sm font-bold text-black transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60'
    : 'w-full rounded bg-magenta px-4 py-2 text-sm font-bold text-white transition hover:bg-magenta-dark disabled:cursor-not-allowed disabled:opacity-60';

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source,
          website,
        }),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      setEmail('');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={isFooter ? 'flex flex-col gap-2' : 'space-y-3'}>
      <label className="sr-only" htmlFor={`${source}-email`}>
        Email
      </label>
      <input
        id={`${source}-email`}
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={inputClass}
        autoComplete="email"
        required
      />
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <button type="submit" className={buttonClass} disabled={status === 'loading'}>
        {status === 'loading' ? '...' : submitLabel}
      </button>
      {status === 'success' && (
        <p className={isFooter ? 'text-xs text-white/70' : 'text-sm font-medium text-green-400'}>
          {successMessage}
        </p>
      )}
      {status === 'error' && (
        <p className={isFooter ? 'text-xs text-red-300' : 'text-sm text-red-400'}>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
