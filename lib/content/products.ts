import fs from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { PRODUCTS_DIR } from '@/lib/constants';
import { productSchema } from '@/lib/content/schema';
import type { DigitalProduct } from '@/lib/types';

/**
 * Reserved for future paid digital products (planners, spreadsheets,
 * workbooks, templates). No checkout is wired up — `/shop` renders these
 * with a disabled "Coming soon" button, the same inert pattern used by the
 * Calculator placeholder. Adding real checkout later (Stripe, Gumroad,
 * Lemon Squeezy) means replacing that button's behavior only; the content
 * model, loader, and page are already in place.
 */
export const getAllProducts = cache((): DigitalProduct[] => {
  if (!fs.existsSync(PRODUCTS_DIR)) return [];

  const filenames = fs.readdirSync(PRODUCTS_DIR).filter((name) => name.endsWith('.json'));

  return filenames.map((filename) => {
    const filePath = path.join(PRODUCTS_DIR, filename);
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const parsed = productSchema.safeParse(raw);

    if (!parsed.success) {
      throw new Error(
        `Invalid product in content/products/${filename}:\n${parsed.error.issues
          .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
          .join('\n')}`,
      );
    }

    return parsed.data;
  });
});

export function getProductBySlug(slug: string): DigitalProduct | undefined {
  return getAllProducts().find((product) => product.slug === slug);
}
