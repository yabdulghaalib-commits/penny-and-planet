import type { ReactNode } from 'react';

interface PullQuoteProps {
  children: ReactNode;
  attribution?: string;
}

/** Large, editorial-style pull quote — distinct from a regular blockquote citation. */
export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <blockquote className="not-prose my-10 border-l-4 border-forest-500 pl-6">
      <p className="font-display text-display-sm leading-snug text-ink">{children}</p>
      {attribution && <footer className="mt-3 font-mono text-eyebrow uppercase tracking-widest text-forest-500">— {attribution}</footer>}
    </blockquote>
  );
}
