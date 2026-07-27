import Link from 'next/link';
import type { Category } from '@/lib/types';
import { categoryHref } from '@/lib/format';
import { CategoryIcon } from '@/components/ui/CategoryIcon';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={categoryHref(category.slug)}
      className="group flex flex-col gap-4 rounded-lg border border-sand-300 bg-white p-6 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-forest-300 hover:shadow-card"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-md bg-sage-100 text-forest-600 transition-colors duration-300 group-hover:bg-forest-600 group-hover:text-white">
        <CategoryIcon slug={category.slug} />
      </span>

      <span>
        <span className="block font-display text-lg text-ink">{category.name}</span>
        <span className="mt-1 block text-sm text-ink-muted">{category.description}</span>
      </span>

      <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-forest-700">
        Explore
        <svg
          viewBox="0 0 16 16"
          className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
