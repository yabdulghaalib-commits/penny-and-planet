import { getAllArticleMeta } from '@/lib/content/articles';
import { RELATED_CATEGORIES } from '@/lib/data/category-relations';
import { RELATED_ARTICLES_LIMIT } from '@/lib/constants';
import type { Article, ArticleMeta, CategorySlug } from '@/lib/types';

export interface RecommendationOptions {
  excludeSlug?: string;
  limit?: number;
  /**
   * Reader-interest signal, reserved for future personalization (e.g. tags
   * inferred from reading history). Ignored today — no reader tracking
   * exists yet — but the scoring engine already knows how to weight it, so
   * wiring up real interest data later needs no restructuring here.
   */
  readerInterestTags?: string[];
}

const WEIGHTS = {
  sameCategory: 3,
  sharedTag: 2,
  readerInterestTag: 1.5,
  editorialBoost: 1,
  recencyMax: 1,
};

/**
 * Scores every candidate article against a source article using multiple
 * signals (shared category, shared tags, editorial/featured status, reader
 * interests, recency) rather than a fixed filter chain. New signals — a
 * real popularity score, collaborative filtering, embeddings-based
 * similarity — can be added as additional weighted terms without changing
 * any call site.
 */
function scoreArticle(candidate: ArticleMeta, source: { category: CategorySlug; tags: string[] }, options: RecommendationOptions, mostRecentTimestamp: number, oldestTimestamp: number): number {
  let score = 0;

  if (candidate.category === source.category) score += WEIGHTS.sameCategory;

  const sharedTagCount = candidate.tags.filter((tag) => source.tags.includes(tag)).length;
  score += sharedTagCount * WEIGHTS.sharedTag;

  if (options.readerInterestTags?.length) {
    const interestMatches = candidate.tags.filter((tag) => options.readerInterestTags?.includes(tag)).length;
    score += interestMatches * WEIGHTS.readerInterestTag;
  }

  if (candidate.featured) score += WEIGHTS.editorialBoost;

  // Recency: newest article in the pool scores +1, oldest scores +0, linear in between.
  const span = mostRecentTimestamp - oldestTimestamp;
  if (span > 0) {
    const candidateTimestamp = new Date(candidate.publishedAt).getTime();
    score += ((candidateTimestamp - oldestTimestamp) / span) * WEIGHTS.recencyMax;
  }

  return score;
}

/**
 * The general-purpose recommendation engine. `getRelatedArticles` (used on
 * the article page) is a thin wrapper around this — this is the one place
 * to extend with smarter algorithms later.
 */
export async function getRecommendedArticles(source: ArticleMeta | Article, options: RecommendationOptions = {}): Promise<ArticleMeta[]> {
  const excludeSlug = options.excludeSlug ?? source.slug;
  const limit = options.limit ?? RELATED_ARTICLES_LIMIT;
  const all = await getAllArticleMeta();
  const candidates = all.filter((article) => article.slug !== excludeSlug);
  if (candidates.length === 0) return [];

  const timestamps = candidates.map((article) => new Date(article.publishedAt).getTime());
  const mostRecent = Math.max(...timestamps);
  const oldest = Math.min(...timestamps);

  return candidates
    .map((candidate) => ({
      candidate,
      score: scoreArticle(candidate, { category: source.category, tags: source.tags }, options, mostRecent, oldest),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

/**
 * Topic-adjacent suggestions for "Continue Your Learning" — deliberately
 * different from `getRecommendedArticles`: it looks at *related categories*
 * (e.g. budgeting → saving money, investing) rather than the same or
 * tag-overlapping category, so it nudges readers toward their next topic
 * instead of more of the same one.
 */
export async function getContinueLearningArticles(currentCategory: CategorySlug, excludeSlug: string, limit = 3): Promise<ArticleMeta[]> {
  const relatedCategories = RELATED_CATEGORIES[currentCategory] ?? [];
  if (relatedCategories.length === 0) return [];

  const all = await getAllArticleMeta();
  return all
    .filter((article) => article.slug !== excludeSlug && relatedCategories.includes(article.category))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
