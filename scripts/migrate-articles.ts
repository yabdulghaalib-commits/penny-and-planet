/**
 * Imports every content/articles/*.mdx file into the `articles` table.
 * Preserves the exact slug (from the filename), category, tags, author,
 * dates, images, and raw MDX body — nothing is rewritten. Safe to re-run:
 * an article whose slug already exists in the database is skipped, not
 * duplicated or overwritten (so re-running after editing one article in
 * the admin dashboard won't clobber that edit with the original file).
 *
 * Usage:
 *   npm run db:import-articles
 *
 * Run this once during setup, after `npm run db:migrate`. The original
 * .mdx files in content/articles/ are left untouched on disk as a
 * historical backup — the running site no longer reads them at runtime
 * (see lib/content/articles.ts), only this script does.
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { articleFrontmatterSchema } from '../lib/content/schema';
import { calculateReadingTime } from '../lib/content/reading-time';
import { isSlugTaken, createArticleRow } from '../lib/db/articles';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

async function main() {
  if (!fs.existsSync(ARTICLES_DIR)) {
    console.log('No content/articles directory found — nothing to import.');
    return;
  }

  const filenames = fs.readdirSync(ARTICLES_DIR).filter((name) => /\.mdx?$/.test(name));
  console.log(`Found ${filenames.length} article file(s) to check.`);

  let imported = 0;
  let skipped = 0;

  for (const filename of filenames) {
    const slug = filename.replace(/\.mdx?$/, '');
    const filePath = path.join(ARTICLES_DIR, filename);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(raw);

    const parsed = articleFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      console.error(`Skipping ${filename}: invalid frontmatter`);
      for (const issue of parsed.error.issues) console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      skipped++;
      continue;
    }

    if (await isSlugTaken(slug)) {
      console.log(`Skipping ${filename}: an article with slug "${slug}" already exists in the database.`);
      skipped++;
      continue;
    }

    const fm = parsed.data;
    await createArticleRow({
      slug,
      title: fm.title,
      metaTitle: fm.metaTitle ?? null,
      metaDescription: fm.metaDescription ?? null,
      excerpt: fm.excerpt,
      featuredImageUrl: fm.featuredImage,
      featuredImageAlt: fm.featuredImageAlt,
      category: fm.category,
      tags: fm.tags,
      authorSlug: fm.author,
      content,
      status: fm.draft ? 'draft' : 'published',
      featured: fm.featured,
      readingTimeMinutes: fm.readingTimeMinutes ?? calculateReadingTime(content),
      publishedAt: fm.publishedAt ?? null,
      updatedAt: fm.updatedAt ?? null,
      publishAt: fm.publishAt ?? null,
      canonicalUrl: fm.canonicalUrl ?? null,
      ogImageUrl: fm.ogImage ?? null,
      downloadableResourceSlug: fm.downloadableResource ?? null,
      faqItems: fm.faqItems ?? null,
      pinterestTitle: null,
      pinterestDescription: null,
      pinterestImageUrl: null,
    });

    console.log(`Imported: ${slug}`);
    imported++;
  }

  console.log(`\nDone. Imported ${imported}, skipped ${skipped} (already present or invalid).`);
}

main().catch((error) => {
  console.error('Article import failed:', error);
  process.exit(1);
});
