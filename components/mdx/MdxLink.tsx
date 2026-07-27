import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export function MdxLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href = '', children, ...rest } = props;
  const isInternal = href.startsWith('/') || href.startsWith('#');

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <svg
        viewBox="0 0 12 12"
        className="ml-0.5 inline h-3 w-3 -translate-y-0.5"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4 2h6v6M10 2 2 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
