import { getAllArticleMeta, getArticleMetaBySlug, getArticleRawContentBySlug } from '@/lib/content/articles';
import { getAuthorBySlugOrFallback } from '@/lib/content/authors';
import { extractTableOfContents } from '@/lib/content/toc';
import { getRecommendedArticles, type RecommendationOptions } from '@/lib/content/recommendations';
import { categories } from '@/lib/data/categories';
import type { Collection } from '@/lib/data/collections';
import { RELATED_ARTICLES_LIMIT } from '@/lib/constants';
import { paginate } from '@/lib/pagination';
import type { Article, ArticleMeta, CategorySlug, PaginatedResult, Tag } from '@/lib/types';

export function toTagSlug(rawTag: string): string {
  return rawTag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toTagName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

/** Resolves lightweight metadata into a full Article: author, raw MDX body, and generated table of contents. */
export function getFullArticleBySlug(slug: string): Article | undefined {
  const meta = getArticleMetaBySlug(slug);
  const rawContent = getArticleRawContentBySlug(slug);
  if (!meta || rawContent === undefined) return undefined;

  const { authorSlug, ...rest } = meta;
  return {
    ...rest,
    author: getAuthorBySlugOrFallback(authorSlug),
    rawContent,
    toc: extractTableOfContents(rawContent),
  };
}

export function getFeaturedArticles(limit?: number): ArticleMeta[] {
  const featured = getAllArticleMeta().filter((article) => article.featured);
  return typeof limit === 'number' ? featured.slice(0, limit) : featured;
}

export function getLatestArticles(limit = 6): ArticleMeta[] {
  // getAllArticleMeta() is already sorted newest → oldest.
  return getAllArticleMeta().slice(0, limit);
}

export function getArticlesByCategory(
  category: CategorySlug,
  page = 1,
  perPage: number,
): PaginatedResult<ArticleMeta> {
  const matches = getAllArticleMeta().filter((article) => article.category === category);
  return paginate(matches, page, perPage);
}

export function getArticlesByTag(tagSlug: string, page = 1, perPage: number): PaginatedResult<ArticleMeta> {
  const matches = getAllArticleMeta().filter((article) => article.tags.some((tag) => toTagSlug(tag) === tagSlug));
  return paginate(matches, page, perPage);
}

export function getArticlesByAuthor(authorSlug: string, page = 1, perPage: number): PaginatedResult<ArticleMeta> {
  const matches = getAllArticleMeta().filter((article) => article.authorSlug === authorSlug);
  return paginate(matches, page, perPage);
}

/**
 * Same category first, then shared tags, then an editorial/recency-weighted
 * score for anything left — powered by the recommendation engine in
 * lib/content/recommendations.ts. Kept as its own function (rather than
 * having call sites import the engine directly) so the article page never
 * has to change if the engine's internals evolve.
 */
export function getRelatedArticles(article: ArticleMeta | Article, limit = RELATED_ARTICLES_LIMIT): ArticleMeta[] {
  return getRecommendedArticles(article, { limit });
}

/** Thin pass-through so call sites can reach the full recommendation engine (e.g. with reader-interest signals) without a separate import. */
export function getRecommendations(article: ArticleMeta | Article, options?: RecommendationOptions): ArticleMeta[] {
  return getRecommendedArticles(article, options);
}

export function getAdjacentArticles(slug: string): { previous: ArticleMeta | null; next: ArticleMeta | null } {
  const all = getAllArticleMeta(); // newest → oldest
  const index = all.findIndex((article) => article.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    // "Next" reads as chronologically newer, "previous" as older — matches reader expectation.
    next: index > 0 ? (all[index - 1] ?? null) : null,
    previous: index < all.length - 1 ? (all[index + 1] ?? null) : null,
  };
}

export function getAllTags(): Tag[] {
  const slugs = new Set<string>();
  for (const article of getAllArticleMeta()) {
    for (const tag of article.tags) slugs.add(toTagSlug(tag));
  }
  return Array.from(slugs)
    .sort()
    .map((slug) => ({ slug, name: toTagName(slug) }));
}

export function getCategoriesWithCounts() {
  const all = getAllArticleMeta();
  return categories.map((category) => ({
    ...category,
    articleCount: all.filter((article) => article.category === category.slug).length,
  }));
}

/**
 * Editorial picks are currently just the manually `featured` set. Kept as
 * its own function so a future stage can back it with a real "editor's
 * pick" flag or a curated list without touching call sites.
 */
export function getEditorsPicks(limit = 3): ArticleMeta[] {
  return getFeaturedArticles(limit);
}

/**
 * TODO(stage: analytics): back this with real pageview data once analytics
 * is wired up. Falls back to latest articles so the call site never has to
 * change when real popularity data arrives.
 */
export function getPopularArticles(limit = 6): ArticleMeta[] {
  return getLatestArticles(limit);
}

/**
 * TODO(stage: analytics): back this with a rolling-window pageview delta.
 * In the meantime, uses featured ("editor's pick") articles as a distinct,
 * still-honest proxy — deliberately different from `getPopularArticles`
 * (which proxies on recency) so the two never render an identical list
 * when shown near each other.
 */
export function getTrendingArticles(limit = 6): ArticleMeta[] {
  const all = getAllArticleMeta();
  const featured = all.filter((article) => article.featured);
  const rest = all.filter((article) => !article.featured);
  return [...featured, ...rest].slice(0, limit);
}

/** Resolves a collection's rule (categories and/or tags) against current content — automatically stays current as articles are published. */
export function getCollectionArticles(collection: Collection, limit?: number): ArticleMeta[] {
  const { categories: ruleCategories, tags: ruleTags } = collection.rule;

  const matches = getAllArticleMeta().filter((article) => {
    const categoryMatch = ruleCategories?.includes(article.category) ?? false;
    const tagMatch = ruleTags?.some((ruleTag) => article.tags.some((tag) => toTagSlug(tag) === toTagSlug(ruleTag))) ?? false;
    return categoryMatch || tagMatch;
  });

  return typeof limit === 'number' ? matches.slice(0, limit) : matches;
}

/**
 * TODO(stage: seasonal campaigns): filter by a `seasonal` frontmatter tag
 * plus a date window once seasonal content exists. Returns an empty list
 * for now rather than guessing, so call sites can safely render "nothing"
 * until real seasonal content is authored.
 */
export function getSeasonalArticles(): ArticleMeta[] {
  return [];
}
