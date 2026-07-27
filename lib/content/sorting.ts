import type { ArticleMeta } from '@/lib/types';

export const SORT_OPTIONS = ['recent', 'reading-time', 'popular'] as const;
export type ArticleSortOption = (typeof SORT_OPTIONS)[number];

export const SORT_LABELS: Record<ArticleSortOption, string> = {
  recent: 'Most Recent',
  'reading-time': 'Reading Time',
  popular: 'Most Popular',
};

export function isArticleSortOption(value: string | null | undefined): value is ArticleSortOption {
  return !!value && (SORT_OPTIONS as readonly string[]).includes(value);
}

/**
 * Sorts a list of articles by the given option. `popular` currently falls
 * back to recency — TODO(stage: analytics): replace with real pageview
 * data once analytics is wired up, same as `getPopularArticles` in
 * lib/content/query.ts.
 */
export function sortArticles(articles: ArticleMeta[], sort: ArticleSortOption = 'recent'): ArticleMeta[] {
  const sorted = [...articles];

  if (sort === 'reading-time') {
    return sorted.sort((a, b) => a.readingTimeMinutes - b.readingTimeMinutes);
  }

  // 'recent' and 'popular' (for now) both sort by publish date, newest first.
  return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
