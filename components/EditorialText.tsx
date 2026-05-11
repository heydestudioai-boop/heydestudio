import { Fragment } from 'react';
import type { ReactNode } from 'react';

interface EditorialTitleProps {
  text: string;
  className?: string;
}

export function EditorialTitle({ text, className = '' }: EditorialTitleProps) {
  const lines = text.split(/\n|(?<=\.)\s+/).filter(Boolean);

  return (
    <span className={`block max-w-full whitespace-normal [overflow-wrap:normal] [word-break:normal] ${className}`}>
      {lines.map((line, index) => (
        <Fragment key={`${line}-${index}`}>
          <span className="block max-w-full whitespace-normal text-balance [overflow-wrap:normal] [word-break:normal]">
            {line}
          </span>
        </Fragment>
      ))}
    </span>
  );
}

interface EditorialKickerProps {
  children: ReactNode;
  muted?: boolean;
}

export function EditorialKicker({ children, muted = false }: EditorialKickerProps) {
  return (
    <p
      className={`mb-5 text-xs font-bold uppercase tracking-[0.22em] ${
        muted ? 'text-white/52' : 'text-magenta'
      }`}
    >
      {children}
    </p>
  );
}

interface EditorialBodyProps {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

export function EditorialBody({ children, dark = false, className = '' }: EditorialBodyProps) {
  return (
    <p
      style={{ width: 'min(42rem, calc(100vw - 6rem))', maxWidth: '100%' }}
      className={`w-full max-w-2xl whitespace-pre-line text-pretty text-lg leading-[1.65] ${
        dark ? 'text-white/74' : 'text-gray-700'
      } ${className}`}
    >
      {children}
    </p>
  );
}
