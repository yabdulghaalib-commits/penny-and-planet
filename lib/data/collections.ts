import type { CategorySlug } from '@/lib/types';

export interface CollectionRule {
  categories?: CategorySlug[];
  tags?: string[];
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  rule: CollectionRule;
}

/**
 * Each collection is a rule, not a hand-picked article list — any current
 * or future article matching the rule's categories/tags is automatically
 * included, so collections stay up to date as new content is published.
 */
export const collections: Collection[] = [
  {
    slug: 'beginners-guide-to-budgeting',
    title: "Beginner's Guide to Budgeting",
    description: 'Start here if budgeting has never quite stuck before.',
    rule: { categories: ['budgeting', 'personal-finance'] },
  },
  {
    slug: 'emergency-fund-essentials',
    title: 'Emergency Fund Essentials',
    description: 'Everything you need to build — and protect — your safety net.',
    rule: { tags: ['emergency-fund', 'saving-money'] },
  },
  {
    slug: 'investing-for-beginners',
    title: 'Investing for Beginners',
    description: 'A calm, honest starting point for growing your money long-term.',
    rule: { categories: ['investing', 'financial-independence'] },
  },
  {
    slug: 'debt-free-journey',
    title: 'Debt-Free Journey',
    description: 'Practical strategies for paying down debt and staying motivated.',
    rule: { categories: ['debt-management'] },
  },
  {
    slug: 'sustainable-living-starter-guide',
    title: 'Sustainable Living Starter Guide',
    description: 'Small, realistic habits that add up to a lighter footprint.',
    rule: { categories: ['sustainable-living', 'eco-friendly-living'] },
  },
  {
    slug: 'eco-friendly-home-collection',
    title: 'Eco-Friendly Home Collection',
    description: 'Make your home more efficient, healthy, and low-waste.',
    rule: { categories: ['green-home'] },
  },
  {
    slug: 'zero-waste-lifestyle',
    title: 'Zero-Waste Lifestyle',
    description: 'Own less, waste less, and spend more intentionally.',
    rule: { categories: ['minimalism', 'sustainable-food'] },
  },
  {
    slug: 'smart-grocery-shopping',
    title: 'Smart Grocery Shopping',
    description: 'Eat well and spend less with a smarter approach to groceries.',
    rule: { tags: ['grocery-budget', 'meal-planning'] },
  },
  {
    slug: 'green-living-on-a-budget',
    title: 'Green Living on a Budget',
    description: 'Proof that sustainable choices and frugal choices are often the same choice.',
    rule: { categories: ['frugal-living', 'eco-friendly-living'] },
  },
  {
    slug: 'financial-independence-roadmap',
    title: 'Financial Independence Roadmap',
    description: 'The building blocks for a plan toward more freedom and less financial stress.',
    rule: { categories: ['financial-independence', 'investing', 'debt-management'] },
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((collection) => collection.slug === slug);
}
