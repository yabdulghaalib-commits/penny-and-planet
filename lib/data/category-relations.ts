import type { CategorySlug } from '@/lib/types';

/**
 * Which categories are topically adjacent to each category. Used to power
 * "Related Categories" on category archive pages and the "Continue Your
 * Learning" recommendation section on articles. A simple static map keeps
 * this predictable and easy to tune by hand as the taxonomy grows.
 */
export const RELATED_CATEGORIES: Record<CategorySlug, CategorySlug[]> = {
  'personal-finance': ['budgeting', 'saving-money', 'financial-independence'],
  budgeting: ['saving-money', 'personal-finance', 'debt-management'],
  'saving-money': ['budgeting', 'investing', 'frugal-living'],
  investing: ['financial-independence', 'saving-money', 'personal-finance'],
  'debt-management': ['budgeting', 'personal-finance', 'saving-money'],
  'financial-independence': ['investing', 'saving-money', 'personal-finance'],
  'sustainable-living': ['eco-friendly-living', 'green-home', 'sustainable-food'],
  'eco-friendly-living': ['sustainable-living', 'green-home', 'ethical-shopping'],
  'frugal-living': ['saving-money', 'minimalism', 'sustainable-food'],
  minimalism: ['frugal-living', 'ethical-shopping', 'sustainable-living'],
  'green-home': ['sustainable-living', 'eco-friendly-living', 'frugal-living'],
  'sustainable-food': ['sustainable-living', 'frugal-living', 'eco-friendly-living'],
  'ethical-shopping': ['minimalism', 'sustainable-living', 'eco-friendly-living'],
};
