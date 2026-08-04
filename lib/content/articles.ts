import { cache } from 'react';
import { getPublishedArticleRows, getAllArticleRows, getArticleRowBySlug, rowToArticleMeta } from '@/lib/db/articles';
import type { ArticleMeta } from '@/lib/types';

/**
 * All published article metadata (excludes drafts and posts scheduled for
 * the future). This is what every listing/query helper should build on.
 *
 * This is the one module that talks to the database directly — everything
 * downstream (lib/content/query.ts, every page, the sitemap, search) only
 * ever calls these four functions. That's what made the Stage 6 admin
 * dashboard possible without touching the rest of the content layer: this
 * file used to read content/articles/*.mdx from the filesystem; it now
 * reads the `articles` table in Postgres instead, with the exact same
 * exported shape. See scripts/migrate-articles.ts for the one-time import
 * of the original MDX files into the database.
 *
 * Wrapped in React's `cache()` so, within a single render/build pass, the
 * database is only queried once no matter how many pages call into this
 * module (homepage, category pages, sitemap, related posts, etc.).
 */
export const getAllArticleMeta = cache(async (): Promise<ArticleMeta[]> => {
  const rows = await getPublishedArticleRows();
  return rows.map(rowToArticleMeta);
});

/**
 * Metadata for every article regardless of draft/scheduled status —
 * intended for internal/admin tooling only, never for public listings.
 */
export const getAllArticleMetaIncludingUnpublished = cache(async (): Promise<ArticleMeta[]> => {
  const rows = await getAllArticleRows();
  return rows.map(rowToArticleMeta);
});

export const getArticleMetaBySlug = cache(async (slug: string): Promise<ArticleMeta | undefined> => {
  const row = await getArticleRowBySlug(slug);
  if (!row) return undefined;
  // A row exists but might be a draft or scheduled for the future — the
  // public site should treat that the same as "not found".
  const meta = rowToArticleMeta(row);
  if (row.status === 'draft') return undefined;
  if (row.publish_at && new Date(row.publish_at).getTime() > Date.now()) return undefined;
  return meta;
});

/** Raw MDX body for a single published article, looked up by slug (used by the article page to compile MDX). */
export const getArticleRawContentBySlug = cache(async (slug: string): Promise<string | undefined> => {
  const row = await getArticleRowBySlug(slug);
  if (!row) return undefined;
  if (row.status === 'draft') return undefined;
  if (row.publish_at && new Date(row.publish_at).getTime() > Date.now()) return undefined;
  return row.content;
});
