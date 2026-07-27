import type { PaginatedResult } from '@/lib/types';

export function paginate<T>(items: T[], page: number, perPage: number): PaginatedResult<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    items: items.slice(start, start + perPage),
    currentPage,
    totalPages,
    totalItems,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
}

/** Page numbers 2..N for `generateStaticParams` on `/…/page/[page]` routes (page 1 lives at the parent route). */
export function getStaticPageNumbers(totalItems: number, perPage: number): number[] {
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => index + 2);
}
