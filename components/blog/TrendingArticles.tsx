import { ArticleCard } from '@/components/ui/ArticleCard';
import { CompactArticleRow } from '@/components/blog/PopularArticles';
import { getTrendingArticles } from '@/lib/content/query';

interface TrendingArticlesProps {
  variant?: 'grid' | 'compact';
  limit?: number;
}

const TrendingIcon = () => (
  <svg viewBox="0 0 20 20" className="h-4 w-4 text-earth-500" fill="none" aria-hidden="true">
    <path
      d="M10 17.5c-3 0-5-2-5-4.5 0-2.5 1.5-3.5 2-5.5.4 1 1 1.5 1.5 1.5.5 0 .5-3 2-5 .5 2 3.5 3.5 3.5 6.5 0 4-2 7-4 7Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);

/** Same pattern as PopularArticles — backed by getTrendingArticles, ready to swap in real analytics later without call-site changes. */
export function TrendingArticles({ variant = 'grid', limit = variant === 'compact' ? 4 : 6 }: TrendingArticlesProps) {
  const articles = getTrendingArticles(limit);
  if (articles.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div>
        <p className="eyebrow flex items-center gap-1.5">
          <TrendingIcon />
          Trending Now
        </p>
        <ul className="mt-3 space-y-4">
          {articles.map((article) => (
            <CompactArticleRow key={article.slug} article={article} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section aria-labelledby="trending-articles-heading">
      <h2 id="trending-articles-heading" className="flex items-center gap-2 text-display-sm text-ink">
        <TrendingIcon />
        Trending Now
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
