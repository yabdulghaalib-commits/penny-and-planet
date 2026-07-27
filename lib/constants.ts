import path from 'node:path';

export const CONTENT_DIR = path.join(process.cwd(), 'content');
export const ARTICLES_DIR = path.join(CONTENT_DIR, 'articles');
export const AUTHORS_DIR = path.join(CONTENT_DIR, 'authors');
export const RESOURCES_DIR = path.join(CONTENT_DIR, 'resources');
export const PRODUCTS_DIR = path.join(CONTENT_DIR, 'products');

export const RELATED_ARTICLES_LIMIT = 3;
export const WORDS_PER_MINUTE = 200;

export const CALLOUT_VARIANTS = ['tip', 'warning', 'note', 'financial-tip', 'sustainability-tip'] as const;
export type CalloutVariant = (typeof CALLOUT_VARIANTS)[number];
