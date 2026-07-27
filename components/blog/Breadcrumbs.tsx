import Link from 'next/link';
import { categoryHref, getCategoryName } from '@/lib/format';
import { cn } from '@/lib/utils';
import type { CategorySlug } from '@/lib/types';

export interface BreadcrumbItem {
  label: string;
  /** Omit href on the final (current-page) item. */
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/** Generic breadcrumb trail — used on article, category, tag, author, and search pages. */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={cn('flex items-center gap-1.5', isLast && 'min-w-0')}>
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-forest-600">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'truncate text-ink-soft' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Builds the standard Home → Articles → Category → Title trail used on the article page. */
export function buildArticleBreadcrumbs(category: CategorySlug, title: string): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: getCategoryName(category), href: categoryHref(category) },
    { label: title },
  ];
}
