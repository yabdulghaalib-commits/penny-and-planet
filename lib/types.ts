/**
 * Domain types for Penny & Planet content.
 *
 * These types describe the shape of content regardless of where it
 * eventually comes from (local MDX today; a headless CMS or database
 * later). UI components should always depend on these types, not on
 * the data-fetching mechanism, so the source can change later without
 * touching any component.
 */

export type CategorySlug =
  | 'personal-finance'
  | 'budgeting'
  | 'saving-money'
  | 'investing'
  | 'debt-management'
  | 'financial-independence'
  | 'sustainable-living'
  | 'eco-friendly-living'
  | 'frugal-living'
  | 'minimalism'
  | 'sustainable-food'
  | 'green-home'
  | 'ethical-shopping';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

/** A tag is a free-form label; unlike categories it has no fixed registry. */
export interface Tag {
  slug: string;
  name: string;
}

export interface AuthorSocialLink {
  platform: 'twitter' | 'instagram' | 'linkedin' | 'website' | 'pinterest';
  url: string;
}

export interface Author {
  slug: string;
  name: string;
  avatarUrl: string;
  bio: string;
  credentials?: string;
  expertise?: string[];
  socialLinks?: AuthorSocialLink[];
}

/** A downloadable resource (planner, tracker, checklist, guide) attachable to an article. */
export interface DownloadableResource {
  slug: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'xlsx' | 'docx' | 'zip';
  relatedCategory?: CategorySlug;
  /** Which Resource Library collection this belongs to (see lib/data/resource-collections.ts). */
  collection?: string;
  previewImage?: string;
}

/** Reserved for future paid digital products — architecture only, no checkout wired up yet. */
export interface DigitalProduct {
  slug: string;
  title: string;
  description: string;
  previewImage: string;
  price: number;
  currency: string;
  relatedCategory?: CategorySlug;
}

export interface TocItem {
  depth: 2 | 3;
  text: string;
  slug: string;
}

/**
 * Lightweight article metadata — everything needed to render a card, a
 * listing, or <head> tags, without paying the cost of compiling MDX body
 * content. This is what listing pages (`getAllArticleMeta`, category/tag/
 * author archives, related posts, etc.) work with.
 */
export interface ArticleMeta {
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  excerpt: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  category: CategorySlug;
  tags: string[];
  authorSlug: string;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  readingTimeMinutes: number;
  featured: boolean;
  draft: boolean;
  publishAt?: string; // ISO date-time — scheduled publication, future-ready
  canonicalUrl?: string;
  ogImageUrl?: string;
  downloadableResourceSlug?: string;
  faqItems?: { question: string; answer: string }[];
}

/** Full article: metadata plus the resolved author, raw body, and generated TOC. */
export interface Article extends Omit<ArticleMeta, 'authorSlug'> {
  author: Author;
  rawContent: string;
  toc: TocItem[];
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
