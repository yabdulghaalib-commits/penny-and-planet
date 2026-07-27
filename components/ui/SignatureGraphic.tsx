import { cn } from '@/lib/utils';

interface SignatureGraphicProps {
  className?: string;
  /** "full" is the large hero illustration; "mark" is a compact section marker. */
  variant?: 'full' | 'mark';
}

/**
 * The Penny & Planet signature element: a single continuous line that
 * begins as an organic leaf curl and resolves into an ascending line-graph,
 * literalizing "grow your wealth, grow sustainably." This is the one bold,
 * illustrative element on the site — used sparingly and consistently.
 */
export function SignatureGraphic({ className, variant = 'full' }: SignatureGraphicProps) {
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 64 64"
        className={cn('h-8 w-8 text-forest-500', className)}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 50c-3-6 1-13 8-13 6 0 6 8 0 8-4 0-6-4-3-7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M16 44l12-6 8 5 14-20"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="38" r="2.5" className="fill-forest-500" />
        <circle cx="36" cy="43" r="2.5" className="fill-forest-500" />
        <circle cx="50" cy="23" r="3" className="fill-gold-400" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 480 340"
      className={cn('h-auto w-full', className)}
      fill="none"
      aria-hidden="true"
    >
      {/* Ambient growth rings, purely decorative */}
      <circle cx="120" cy="230" r="150" className="stroke-sage-200" strokeWidth="1" opacity="0.6" />
      <circle cx="120" cy="230" r="105" className="stroke-sage-200" strokeWidth="1" opacity="0.5" />

      {/* Leaf curl → ascending line graph, one continuous gesture */}
      <path
        d="M48 268c-10-16-2-34 16-36 16-2 22 16 8 20-10 3-16-6-8-13"
        className="stroke-forest-500"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M64 252c14 8 40 6 62-8 20-13 34-8 50 2 18 12 38 6 56-24 16-26 34-40 60-46"
        className="stroke-forest-600"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small leaves along the stem */}
      <path d="M92 240c8-10 22-10 26-2-8 8-20 8-26 2z" className="fill-sage-300" opacity="0.85" />
      <path d="M150 226c6-11 20-13 26-6-7 9-20 10-26 6z" className="fill-sage-300" opacity="0.7" />

      {/* Data nodes along the ascending line */}
      <circle cx="126" cy="244" r="4" className="fill-forest-600" />
      <circle cx="176" cy="236" r="4" className="fill-forest-600" />
      <circle cx="226" cy="238" r="4" className="fill-forest-600" />
      <circle cx="282" cy="214" r="4" className="fill-forest-600" />
      <circle cx="338" cy="190" r="5" className="fill-earth-500" />
      <circle cx="410" cy="146" r="6" className="fill-gold-400" />
    </svg>
  );
}
