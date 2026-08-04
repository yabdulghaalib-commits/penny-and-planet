import { sql } from '@/lib/db/client';
import type { ArticleMeta, CategorySlug } from '@/lib/types';

/** Raw shape of a Postgres `articles` row (snake_case, as returned by @vercel/postgres). */
export interface ArticleRow {
  id: number;
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  excerpt: string;
  featured_image_url: string;
  featured_image_alt: string;
  category: string;
  tags: string[];
  author_slug: string;
  content: string;
  status: 'draft' | 'published';
  featured: boolean;
  reading_time_minutes: number | null;
  published_at: string | null;
  updated_at: string | null;
  publish_at: string | null;
  canonical_url: string | null;
  og_image_url: string | null;
  downloadable_resource_slug: string | null;
  faq_items: { question: string; answer: string }[] | null;
  pinterest_title: string | null;
  pinterest_description: string | null;
  pinterest_image_url: string | null;
  created_at: string;
}

/** Input shape accepted from the admin article form (and the one-time MDX migration script). */
export interface ArticleInput {
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  excerpt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  category: string;
  tags: string[];
  authorSlug: string;
  content: string;
  status: 'draft' | 'published';
  featured: boolean;
  readingTimeMinutes?: number | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  publishAt?: string | null;
  canonicalUrl?: string | null;
  ogImageUrl?: string | null;
  downloadableResourceSlug?: string | null;
  faqItems?: { question: string; answer: string }[] | null;
  pinterestTitle?: string | null;
  pinterestDescription?: string | null;
  pinterestImageUrl?: string | null;
}

export function rowToArticleMeta(row: ArticleRow): ArticleMeta {
  return {
    slug: row.slug,
    title: row.title,
    metaTitle: row.meta_title ?? undefined,
    metaDescription: row.meta_description ?? undefined,
    excerpt: row.excerpt,
    featuredImageUrl: row.featured_image_url,
    featuredImageAlt: row.featured_image_alt,
    category: row.category as CategorySlug,
    tags: row.tags ?? [],
    authorSlug: row.author_slug,
    publishedAt: row.published_at ?? row.created_at,
    updatedAt: row.updated_at ?? undefined,
    readingTimeMinutes: row.reading_time_minutes ?? 1,
    featured: row.featured,
    draft: row.status === 'draft',
    publishAt: row.publish_at ?? undefined,
    canonicalUrl: row.canonical_url ?? undefined,
    ogImageUrl: row.og_image_url ?? undefined,
    downloadableResourceSlug: row.downloadable_resource_slug ?? undefined,
    faqItems: row.faq_items ?? undefined,
  };
}

/** Every article row regardless of status — admin dashboard only, never for public listings. */
export async function getAllArticleRows(): Promise<ArticleRow[]> {
  const result = await sql<ArticleRow>`SELECT * FROM articles ORDER BY created_at DESC`;
  return result.rows;
}

export async function getPublishedArticleRows(): Promise<ArticleRow[]> {
  const result = await sql<ArticleRow>`
    SELECT * FROM articles
    WHERE status = 'published'
      AND (publish_at IS NULL OR publish_at <= now())
    ORDER BY published_at DESC NULLS LAST, created_at DESC
  `;
  return result.rows;
}

export async function getArticleRowBySlug(slug: string): Promise<ArticleRow | null> {
  const result = await sql<ArticleRow>`SELECT * FROM articles WHERE slug = ${slug} LIMIT 1`;
  return result.rows[0] ?? null;
}

export async function getArticleRowById(id: number): Promise<ArticleRow | null> {
  const result = await sql<ArticleRow>`SELECT * FROM articles WHERE id = ${id} LIMIT 1`;
  return result.rows[0] ?? null;
}

export async function isSlugTaken(slug: string, excludeId?: number): Promise<boolean> {
  const result = excludeId
    ? await sql`SELECT 1 FROM articles WHERE slug = ${slug} AND id != ${excludeId} LIMIT 1`
    : await sql`SELECT 1 FROM articles WHERE slug = ${slug} LIMIT 1`;
  return result.rows.length > 0;
}

export async function createArticleRow(input: ArticleInput): Promise<ArticleRow> {
  const result = await sql<ArticleRow>`
    INSERT INTO articles (
      slug, title, meta_title, meta_description, excerpt, featured_image_url, featured_image_alt,
      category, tags, author_slug, content, status, featured, reading_time_minutes,
      published_at, updated_at, publish_at, canonical_url, og_image_url, downloadable_resource_slug,
      faq_items, pinterest_title, pinterest_description, pinterest_image_url
    ) VALUES (
      ${input.slug}, ${input.title}, ${input.metaTitle ?? null}, ${input.metaDescription ?? null},
      ${input.excerpt}, ${input.featuredImageUrl}, ${input.featuredImageAlt}, ${input.category},
      ${input.tags}, ${input.authorSlug}, ${input.content}, ${input.status}, ${input.featured},
      ${input.readingTimeMinutes ?? null}, ${input.publishedAt ?? null}, ${input.updatedAt ?? null},
      ${input.publishAt ?? null}, ${input.canonicalUrl ?? null}, ${input.ogImageUrl ?? null},
      ${input.downloadableResourceSlug ?? null},
      ${input.faqItems ? JSON.stringify(input.faqItems) : null},
      ${input.pinterestTitle ?? null}, ${input.pinterestDescription ?? null}, ${input.pinterestImageUrl ?? null}
    )
    RETURNING *
  `;
  const row = result.rows[0];
  if (!row) throw new Error('Failed to create article: no row returned');
  return row;
}

export async function updateArticleRow(id: number, input: ArticleInput): Promise<ArticleRow> {
  const result = await sql<ArticleRow>`
    UPDATE articles SET
      slug = ${input.slug},
      title = ${input.title},
      meta_title = ${input.metaTitle ?? null},
      meta_description = ${input.metaDescription ?? null},
      excerpt = ${input.excerpt},
      featured_image_url = ${input.featuredImageUrl},
      featured_image_alt = ${input.featuredImageAlt},
      category = ${input.category},
      tags = ${input.tags},
      author_slug = ${input.authorSlug},
      content = ${input.content},
      status = ${input.status},
      featured = ${input.featured},
      reading_time_minutes = ${input.readingTimeMinutes ?? null},
      published_at = ${input.publishedAt ?? null},
      updated_at = ${input.updatedAt ?? null},
      publish_at = ${input.publishAt ?? null},
      canonical_url = ${input.canonicalUrl ?? null},
      og_image_url = ${input.ogImageUrl ?? null},
      downloadable_resource_slug = ${input.downloadableResourceSlug ?? null},
      faq_items = ${input.faqItems ? JSON.stringify(input.faqItems) : null},
      pinterest_title = ${input.pinterestTitle ?? null},
      pinterest_description = ${input.pinterestDescription ?? null},
      pinterest_image_url = ${input.pinterestImageUrl ?? null}
    WHERE id = ${id}
    RETURNING *
  `;
  const row = result.rows[0];
  if (!row) throw new Error(`Failed to update article ${id}: no row returned`);
  return row;
}

/** Publish/unpublish toggle without touching any other field. */
export async function setArticleStatus(id: number, status: 'draft' | 'published'): Promise<void> {
  await sql`UPDATE articles SET status = ${status} WHERE id = ${id}`;
}

export async function deleteArticleRow(id: number): Promise<void> {
  await sql`DELETE FROM articles WHERE id = ${id}`;
}
