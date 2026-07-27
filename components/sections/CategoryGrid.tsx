import { Container } from '@/components/ui/Container';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { categories } from '@/lib/data/categories';

export function CategoryGrid() {
  return (
    <section aria-labelledby="category-grid-heading" className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Find your topic</p>
          <h2 id="category-grid-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
            Browse by Category
          </h2>
          <p className="mt-4 text-body-base text-ink-muted">
            Whether you&apos;re paying down debt or building a greener home, start with the topic that
            matters most to you right now.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>
    </section>
  );
}
