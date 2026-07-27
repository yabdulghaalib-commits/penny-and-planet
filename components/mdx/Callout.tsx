import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { CalloutVariant } from '@/lib/constants';

interface CalloutProps {
  type?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

const VARIANT_STYLES: Record<CalloutVariant, string> = {
  tip: 'border-forest-400 bg-forest-50',
  note: 'border-sage-400 bg-sage-50',
  warning: 'border-earth-400 bg-earth-50',
  'financial-tip': 'border-forest-600 bg-forest-50',
  'sustainability-tip': 'border-sage-500 bg-sage-50',
};

const VARIANT_LABELS: Record<CalloutVariant, string> = {
  tip: 'Tip',
  note: 'Note',
  warning: 'Warning',
  'financial-tip': 'Financial Tip',
  'sustainability-tip': 'Sustainability Tip',
};

const VARIANT_ICONS: Record<CalloutVariant, ReactNode> = {
  tip: (
    <path d="M10 2c-3 0-5 2.2-5 5 0 2 1 3 2 4v2h6v-2c1-1 2-2 2-4 0-2.8-2-5-5-5Z M8 16h4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  note: <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-11v4m0 3h.01" strokeLinecap="round" strokeLinejoin="round" />,
  warning: <path d="M10 3 2 17h16L10 3Zm0 6v4m0 2.5h.01" strokeLinecap="round" strokeLinejoin="round" />,
  'financial-tip': (
    <path
      d="M10 3v14M13.5 6.5c0-1.4-1.6-2.5-3.5-2.5S6.5 5.1 6.5 6.5 8.1 9 10 9s3.5 1.1 3.5 2.5-1.6 2.5-3.5 2.5-3.5-1.1-3.5-2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'sustainability-tip': (
    <path
      d="M10 17c-4-2.4-6-5.6-6-9.2A5.8 5.8 0 0 1 10 3a5.8 5.8 0 0 1 6 4.8c0 3.6-2 6.8-6 9.2Z M10 10.5v5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

/** Editorial callout box: tips, notes, warnings, plus finance- and sustainability-specific tip cards. */
export function Callout({ type = 'note', title, children }: CalloutProps) {
  return (
    <div role="note" className={cn('not-prose my-6 rounded-md border-l-4 p-5', VARIANT_STYLES[type])}>
      <div className="flex items-center gap-2 font-body text-sm font-semibold text-ink">
        <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-forest-600" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          {VARIANT_ICONS[type]}
        </svg>
        {title ?? VARIANT_LABELS[type]}
      </div>
      <div className="prose-editorial mt-2 max-w-none text-sm leading-relaxed text-ink-soft [&_p]:mt-0">{children}</div>
    </div>
  );
}
