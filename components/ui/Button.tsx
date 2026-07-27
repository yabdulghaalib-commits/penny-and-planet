import Link from 'next/link';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-300 ease-editorial disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-forest-700 text-white hover:bg-forest-600 active:bg-forest-800 shadow-subtle hover:shadow-card',
  secondary:
    'bg-transparent text-forest-700 border border-forest-300 hover:border-forest-500 hover:bg-forest-50',
  ghost: 'bg-transparent text-ink-soft hover:text-forest-700 hover:bg-sand-200',
};

const sizes: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-body-base px-5 py-2.5',
  lg: 'text-body-lg px-7 py-3.5',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Renders a <Link> when `href` is provided, otherwise a native <button>.
 * This keeps a single visual component for every call-to-action on the
 * site while staying semantically correct (navigation vs. action).
 */
export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
