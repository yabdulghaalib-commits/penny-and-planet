import { z } from 'zod';

const categorySlugs = [
  'personal-finance',
  'budgeting',
  'saving-money',
  'investing',
  'debt-management',
  'financial-independence',
  'sustainable-living',
  'eco-friendly-living',
  'frugal-living',
  'minimalism',
  'sustainable-food',
  'green-home',
  'ethical-shopping',
] as const;

/**
 * The complete frontmatter contract for a Markdown/MDX article. A writer
 * only needs to fill this in — everything else (slug in the URL, reading
 * time, table of contents, related posts) is derived automatically.
 */
export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  excerpt: z.string().min(1),
  featuredImage: z.string().min(1),
  featuredImageAlt: z.string().min(1),
  category: z.enum(categorySlugs),
  tags: z.array(z.string()).default([]),
  author: z.string().min(1),
  publishedAt: z.string().min(1),
  updatedAt: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  publishAt: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  ogImage: z.string().optional(),
  downloadableResource: z.string().optional(),
  readingTimeMinutes: z.number().positive().optional(),
  faqItems: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
});

export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;

export const authorSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  avatarUrl: z.string().min(1),
  bio: z.string().min(1),
  credentials: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  socialLinks: z
    .array(
      z.object({
        platform: z.enum(['twitter', 'instagram', 'linkedin', 'website', 'pinterest']),
        url: z.string().url(),
      }),
    )
    .optional(),
});

export const resourceSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  fileUrl: z.string().min(1),
  fileType: z.enum(['pdf', 'xlsx', 'docx', 'zip']),
  relatedCategory: z.enum(categorySlugs).optional(),
  collection: z.string().optional(),
  previewImage: z.string().optional(),
});

/** Reserved for future paid digital products (Stage 6 architecture only — no checkout wired up yet). */
export const productSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  previewImage: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  relatedCategory: z.enum(categorySlugs).optional(),
});
