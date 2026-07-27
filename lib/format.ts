import { categories } from '@/lib/data/categories';
import type { CategorySlug } from '@/lib/types';

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getCategoryName(slug: CategorySlug): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

export function categoryHref(slug: CategorySlug): string {
  return `/category/${slug}`;
}

/** Clean SEO-friendly article URL: /<category>/<slug> — no ids, no query params. */
export function articleHref(category: CategorySlug, slug: string): string {
  return `/${category}/${slug}`;
}

export function tagHref(slug: string): string {
  return `/tag/${slug}`;
}

export function authorHref(slug: string): string {
  return `/author/${slug}`;
}

export function articlesIndexHref(page = 1): string {
  return page <= 1 ? '/articles' : `/articles/page/${page}`;
}

export function categoryPageHref(category: CategorySlug, page = 1): string {
  return page <= 1 ? categoryHref(category) : `${categoryHref(category)}/page/${page}`;
}

export function tagPageHref(slug: string, page = 1): string {
  return page <= 1 ? tagHref(slug) : `${tagHref(slug)}/page/${page}`;
}

export function authorPageHref(slug: string, page = 1): string {
  return page <= 1 ? authorHref(slug) : `${authorHref(slug)}/page/${page}`;
}
