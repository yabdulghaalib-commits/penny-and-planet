import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import matter from 'gray-matter';
import { ARTICLES_DIR } from '@/lib/constants';
import { articleFrontmatterSchema } from '@/lib/content/schema';
import { calculateReadingTime } from '@/lib/content/reading-time';
import type { ArticleMeta, CategorySlug } from '@/lib/types';

interface RawArticleFile {
  filename: string;
  slug: string;
  frontmatter: ReturnType<typeof articleFrontmatterSchema.parse>;
  rawContent: string;
}

/**
 * Reads and validates every `.mdx`/`.md` file in `content/articles`. Wrapped
 * in React's `cache()` so, within a single render/build pass, the
 * filesystem is only walked once no matter how many pages call into this
 * module (homepage, category pages, sitemap, related posts, etc.).
 */
const readAllArticleFiles = cache((): RawArticleFile[] => {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const filenames = fs.readdirSync(ARTICLES_DIR).filter((name) => /\.mdx?$/.test(name));

  return filenames.map((filename) => {
    const filePath = path.join(ARTICLES_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const parsed = articleFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/articles/${filename}:\n${parsed.error.issues
          .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
          .join('\n')}`,
      );
    }

    return {
      filename,
      slug: filename.replace(/\.mdx?$/, ''),
      frontmatter: parsed.data,
      rawContent: content,
    };
  });
});

function toArticleMeta(file: RawArticleFile): ArticleMeta {
  const fm = file.frontmatter;
  return {
    slug: file.slug,
    title: fm.title,
    metaTitle: fm.metaTitle,
    metaDescription: fm.metaDescription,
    excerpt: fm.excerpt,
    featuredImageUrl: fm.featuredImage,
    featuredImageAlt: fm.featuredImageAlt,
    category: fm.category as CategorySlug,
    tags: fm.tags,
    authorSlug: fm.author,
    publishedAt: fm.publishedAt,
    updatedAt: fm.updatedAt,
    readingTimeMinutes: fm.readingTimeMinutes ?? calculateReadingTime(file.rawContent),
    featured: fm.featured,
    draft: fm.draft,
    publishAt: fm.publishAt,
    canonicalUrl: fm.canonicalUrl,
    ogImageUrl: fm.ogImage,
    downloadableResourceSlug: fm.downloadableResource,
    faqItems: fm.faqItems,
  };
}

function isPublished(meta: ArticleMeta): boolean {
  if (meta.draft) return false;
  if (meta.publishAt && new Date(meta.publishAt).getTime() > Date.now()) return false;
  return true;
}

/**
 * All published article metadata (excludes drafts and posts scheduled for
 * the future). This is what every listing/query helper should build on.
 */
export const getAllArticleMeta = cache((): ArticleMeta[] => {
  return readAllArticleFiles()
    .map(toArticleMeta)
    .filter(isPublished)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
});

/**
 * Metadata for every article file regardless of draft/scheduled status —
 * intended for internal tooling only (e.g. a future preview mode), never
 * for public listings.
 */
export const getAllArticleMetaIncludingUnpublished = cache((): ArticleMeta[] => {
  return readAllArticleFiles().map(toArticleMeta);
});

export function getArticleMetaBySlug(slug: string): ArticleMeta | undefined {
  return getAllArticleMeta().find((article) => article.slug === slug);
}

/** Raw MDX body for a single article, looked up by slug (used by the article page to compile MDX). */
export function getArticleRawContentBySlug(slug: string): string | undefined {
  return readAllArticleFiles().find((file) => file.slug === slug)?.rawContent;
}
