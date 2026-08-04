import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SignatureGraphic } from '@/components/ui/SignatureGraphic';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { CategoryCard } from '@/components/ui/CategoryCard';
import { NotFoundSearch } from '@/components/blog/NotFoundSearch';
import { getLatestArticles } from '@/lib/content/query';
import { categories } from '@/lib/data/categories';

export default async function NotFound() {
  let recommended: Awaited<ReturnType<typeof getLatestArticles>> = [];
  try {
    recommended = await getLatestArticles(3);
  } catch {
    // A 404 page should never itself fail — worst case, just skip the "You Might Like These" section.
  }
  const popularCategories = categories.slice(0, 6);

  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto w-48" aria-hidden="true">
            <SignatureGraphic />
          </div>

          <p className="eyebrow mt-6">Error 404</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">We couldn&apos;t find that page.</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            The page you&apos;re looking for may have moved, been renamed, or never existed in the first place.
            Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Back to Homepage
            </Button>
            <Button href="/articles" variant="secondary" size="lg">
              Browse Latest Articles
            </Button>
          </div>

          <div className="mt-8">
            <NotFoundSearch />
          </div>
        </div>

        {recommended.length > 0 && (
          <section aria-labelledby="recommended-heading" className="mx-auto mt-20 max-w-5xl">
            <h2 id="recommended-heading" className="text-center text-display-sm text-ink">
              You Might Like These
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {recommended.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="popular-categories-heading" className="mx-auto mt-20 max-w-5xl">
          <h2 id="popular-categories-heading" className="text-center text-display-sm text-ink">
            Popular Categories
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {popularCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
