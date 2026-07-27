import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { getLatestArticles } from '@/lib/content/query';

export function LatestArticles() {
  const latest = getLatestArticles(6);

  return (
    <section aria-labelledby="latest-articles-heading" className="bg-white py-16 lg:py-24">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Fresh off the desk</p>
            <h2 id="latest-articles-heading" className="mt-2 text-display-sm text-ink sm:text-display-md">
              Latest Articles
            </h2>
          </div>
          <Button href="/articles" variant="ghost" size="sm" className="shrink-0">
            View all articles →
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
