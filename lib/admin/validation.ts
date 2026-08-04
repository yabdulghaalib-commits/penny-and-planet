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

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export const adminArticleInputSchema = z.object({
  slug: z.string().min(1, 'Slug is required').regex(SLUG_PATTERN, 'Slug must be lowercase letters, numbers, and hyphens only'),
  title: z.string().min(1, 'Title is required'),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  excerpt: z.string().min(1, 'Excerpt is required'),
  featuredImageUrl: z.string().min(1, 'Featured image URL is required'),
  featuredImageAlt: z.string().min(1, 'Featured image alt text is required'),
  category: z.enum(categorySlugs, { errorMap: () => ({ message: 'Choose a valid category' }) }),
  tags: z.array(z.string()).default([]),
  authorSlug: z.string().min(1, 'Author is required'),
  content: z.string(),
  status: z.enum(['draft', 'published']),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional().nullable(),
  updatedAt: z.string().optional().nullable(),
  publishAt: z.string().optional().nullable(),
  canonicalUrl: z.union([z.string().url(), z.literal('')]).optional().nullable(),
  ogImageUrl: z.string().optional().nullable(),
  downloadableResourceSlug: z.string().optional().nullable(),
  pinterestTitle: z.string().optional().nullable(),
  pinterestDescription: z.string().optional().nullable(),
  pinterestImageUrl: z.string().optional().nullable(),
});

export type AdminArticleInput = z.infer<typeof adminArticleInputSchema>;
