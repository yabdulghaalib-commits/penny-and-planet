import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { RESOURCES_DIR } from '@/lib/constants';
import { resourceSchema } from '@/lib/content/schema';
import type { DownloadableResource } from '@/lib/types';

export const getAllResources = cache((): DownloadableResource[] => {
  if (!fs.existsSync(RESOURCES_DIR)) return [];

  const filenames = fs.readdirSync(RESOURCES_DIR).filter((name) => name.endsWith('.json'));

  return filenames.map((filename) => {
    const filePath = path.join(RESOURCES_DIR, filename);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const parsed = resourceSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error(
        `Invalid resource in content/resources/${filename}:\n${parsed.error.issues
          .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
          .join('\n')}`,
      );
    }

    return parsed.data;
  });
});

export function getResourceBySlug(slug: string): DownloadableResource | undefined {
  return getAllResources().find((resource) => resource.slug === slug);
}
