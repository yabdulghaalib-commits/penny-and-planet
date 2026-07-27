import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { getFeaturedArticles } from '@/lib/content/query';

export function FeaturedArticles() {
  const featured = getFeaturedArticles();

  if (featured.length === 0) return null;

  return (
    <section aria-labelledby="featured-articles-heading" className="py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="featured-articles-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
              Featured Articles
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-muted">
            Hand-picked guides that give you the clearest starting point, whichever part of your financial
            or sustainability journey you&apos;re on.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((article, index) => (
            <ArticleCard key={article.slug} article={article} variant="featured" priority={index === 0} />
          ))}
        </div>
      </Container>
    </section>
  );
}
