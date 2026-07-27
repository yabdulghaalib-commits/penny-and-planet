import type { CategorySlug } from '@/lib/types';
import { RELATED_CATEGORIES } from '@/lib/data/category-relations';
import { categories } from '@/lib/data/categories';
import { CategoryCard } from '@/components/ui/CategoryCard';

interface RelatedCategoriesProps {
  category: CategorySlug;
}

export function RelatedCategories({ category }: RelatedCategoriesProps) {
  const relatedSlugs = RELATED_CATEGORIES[category] ?? [];
  const related = relatedSlugs
    .map((slug) => categories.find((entry) => entry.slug === slug))
    .filter((entry): entry is (typeof categories)[number] => Boolean(entry));

  if (related.length === 0) return null;

  return (
    <section aria-labelledby="related-categories-heading" className="mt-16">
      <h2 id="related-categories-heading" className="text-display-sm text-ink">
        Related Categories
      </h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((entry) => (
          <CategoryCard key={entry.slug} category={entry} />
        ))}
      </div>
    </section>
  );
}
