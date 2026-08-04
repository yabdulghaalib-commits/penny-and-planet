import { getAllArticleMeta } from '@/lib/content/articles';
import { getAuthorBySlugOrFallback } from '@/lib/content/authors';
import { toTagSlug } from '@/lib/content/query';
import { sortArticles, type ArticleSortOption } from '@/lib/content/sorting';
import { getCategoryName, articleHref } from '@/lib/format';
import type { ArticleMeta, CategorySlug } from '@/lib/types';

export interface SearchResultItem {
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  category: CategorySlug;
  categoryLabel: string;
  tags: string[];
  authorName: string;
  publishedAt: string;
  readingTimeMinutes: number;
  featuredImageUrl: string;
  featuredImageAlt: string;
}

export interface SearchOptions {
  query?: string;
  category?: CategorySlug;
  tag?: string;
  sort?: ArticleSortOption;
  limit?: number;
}

/** Legacy shape kept for the existing /api/search-index consumers. */
export interface SearchIndexEntry {
  title: string;
  excerpt: string;
  url: string;
  category: string;
  tags: string[];
}

function toSearchResultItem(article: ArticleMeta): SearchResultItem {
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    url: articleHref(article.category, article.slug),
    category: article.category,
    categoryLabel: getCategoryName(article.category),
    tags: article.tags,
    authorName: getAuthorBySlugOrFallback(article.authorSlug).name,
    publishedAt: article.publishedAt,
    readingTimeMinutes: article.readingTimeMinutes,
    featuredImageUrl: article.featuredImageUrl,
    featuredImageAlt: article.featuredImageAlt,
  };
}

/**
 * The core search + filter implementation, shared by the `/api/search`
 * route (used by the Search page) and any future filter UI. Matches
 * against title, excerpt, category, tags, and author — everything the
 * Search page's requirements call for — server-side, so the client never
 * has to download the full article index to filter it.
 */
export async function searchArticles(options: SearchOptions = {}): Promise<SearchResultItem[]> {
  let results = await getAllArticleMeta();

  if (options.category) {
    results = results.filter((article) => article.category === options.category);
  }

  if (options.tag) {
    results = results.filter((article) => article.tags.some((tag) => toTagSlug(tag) === options.tag));
  }

  let items = results.map(toSearchResultItem);

  if (options.query?.trim()) {
    const q = options.query.trim().toLowerCase();
    items = items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.authorName.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  const sortedMeta = sortArticles(
    results.filter((article) => items.some((item) => item.slug === article.slug)),
    options.sort,
  );
  const order = new Map(sortedMeta.map((article, index) => [article.slug, index]));
  items.sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));

  return typeof options.limit === 'number' ? items.slice(0, options.limit) : items;
}

/**
 * Builds a flat, client-fetchable full index. Deliberately data-only —
 * whichever future UI wants an offline/instant-search index (a command
 * palette, for example) can fetch `/api/search-index` and use it however
 * it likes, without this module needing to know about that UI.
 */
export async function buildSearchIndex(): Promise<SearchIndexEntry[]> {
  const items = await searchArticles();
  return items.map((item) => ({
    title: item.title,
    excerpt: item.excerpt,
    url: item.url,
    category: item.categoryLabel,
    tags: item.tags,
  }));
}
