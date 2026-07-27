import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** Builds the href for a given page number (each listing type has its own URL shape). */
  hrefForPage: (page: number) => string;
}

export function Pagination({ currentPage, totalPages, hrefForPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      <PaginationLink
        href={currentPage > 1 ? hrefForPage(currentPage - 1) : undefined}
        label="Previous page"
      >
        ←
      </PaginationLink>

      <ul className="flex items-center gap-1">
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={hrefForPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-forest-700 text-white'
                  : 'text-ink-soft hover:bg-sand-200 hover:text-forest-700',
              )}
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>

      <PaginationLink
        href={currentPage < totalPages ? hrefForPage(currentPage + 1) : undefined}
        label="Next page"
      >
        →
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  label,
  children,
}: {
  href: string | undefined;
  label: string;
  children: React.ReactNode;
}) {
  const baseClasses = 'flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors';

  if (!href) {
    return (
      <span aria-hidden="true" className={cn(baseClasses, 'text-sand-400')}>
        {children}
      </span>
    );
  }

  return (
    <Link href={href} aria-label={label} className={cn(baseClasses, 'text-ink-soft hover:bg-sand-200 hover:text-forest-700')}>
      {children}
    </Link>
  );
}
