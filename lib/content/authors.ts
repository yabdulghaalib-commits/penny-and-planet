import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { AUTHORS_DIR } from '@/lib/constants';
import { authorSchema } from '@/lib/content/schema';
import type { Author } from '@/lib/types';

export const getAllAuthors = cache((): Author[] => {
  if (!fs.existsSync(AUTHORS_DIR)) return [];

  const filenames = fs.readdirSync(AUTHORS_DIR).filter((name) => name.endsWith('.json'));

  return filenames.map((filename) => {
    const filePath = path.join(AUTHORS_DIR, filename);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const parsed = authorSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error(
        `Invalid author profile in content/authors/${filename}:\n${parsed.error.issues
          .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
          .join('\n')}`,
      );
    }

    return parsed.data;
  });
});

export function getAuthorBySlug(slug: string): Author | undefined {
  return getAllAuthors().find((author) => author.slug === slug);
}

/** Falls back to a minimal placeholder so a typo'd author slug never crashes an article page. */
export function getAuthorBySlugOrFallback(slug: string): Author {
  return (
    getAuthorBySlug(slug) ?? {
      slug,
      name: 'Penny & Planet Team',
      avatarUrl: 'https://picsum.photos/seed/pp-author-fallback/200/200',
      bio: 'The Penny and Planet editorial team.',
    }
  );
}
