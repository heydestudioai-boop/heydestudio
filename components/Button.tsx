import Link from 'next/link';

interface ButtonProps {
  href: string;
  label: string;
  variant?: 'primary' | 'secondary';
  target?: string;
  rel?: string;
}

export function Button({ href, label, variant = 'primary', target, rel }: ButtonProps) {
  const baseStyles = 'inline-flex w-full min-w-56 items-center justify-center rounded-sm px-8 py-3 text-center text-sm font-bold uppercase tracking-[0.08em] transition-colors sm:w-auto';
  const variantStyles = {
    primary: 'bg-magenta text-white hover:bg-magenta-dark',
    secondary: 'border border-magenta text-magenta hover:bg-magenta/10',
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {label}
    </Link>
  );
}
