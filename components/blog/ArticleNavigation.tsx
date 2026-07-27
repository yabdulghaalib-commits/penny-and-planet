import Link from 'next/link';
import type { ArticleMeta } from '@/lib/types';
import { articleHref } from '@/lib/format';

interface ArticleNavigationProps {
  previous: ArticleMeta | null;
  next: ArticleMeta | null;
}

export function ArticleNavigation({ previous, next }: ArticleNavigationProps) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More articles" className="mx-auto mt-14 grid max-w-content-narrow gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={articleHref(previous.category, previous.slug)}
          className="group rounded-lg border border-sand-300 bg-white p-5 transition-colors hover:border-forest-300"
        >
          <span className="eyebrow">← Previous</span>
          <span className="mt-2 block font-display text-base text-ink group-hover:text-forest-700">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}

      {next ? (
        <Link
          href={articleHref(next.category, next.slug)}
          className="group rounded-lg border border-sand-300 bg-white p-5 text-right transition-colors hover:border-forest-300 sm:col-start-2"
        >
          <span className="eyebrow">Next →</span>
          <span className="mt-2 block font-display text-base text-ink group-hover:text-forest-700">
            {next.title}
          </span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
    </nav>
  );
}
