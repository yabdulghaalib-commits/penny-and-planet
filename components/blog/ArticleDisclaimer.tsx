import Link from 'next/link';
import type { CategorySlug } from '@/lib/types';

const FINANCE_CATEGORIES: CategorySlug[] = [
  'personal-finance',
  'budgeting',
  'saving-money',
  'investing',
  'debt-management',
  'financial-independence',
];

interface ArticleDisclaimerProps {
  category: CategorySlug;
}

/** Renders automatically on finance-topic articles — no per-article authoring needed. See /disclaimer for the full policy. */
export function ArticleDisclaimer({ category }: ArticleDisclaimerProps) {
  if (!FINANCE_CATEGORIES.includes(category)) return null;

  return (
    <p className="mx-auto mt-8 max-w-content-narrow rounded-md bg-sand-100 px-4 py-3 text-xs leading-relaxed text-ink-muted">
      This article is for educational purposes only and isn&apos;t financial, legal, or tax advice. Please consult
      a qualified professional before making financial decisions. See our{' '}
      <Link href="/disclaimer" className="underline decoration-sand-300 underline-offset-4 hover:text-forest-600">
        Disclaimer
      </Link>
      .
    </p>
  );
}
