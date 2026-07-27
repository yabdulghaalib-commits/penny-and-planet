import type { ArticleMeta } from '@/lib/types';
import { ArticleCard } from '@/components/ui/ArticleCard';

interface RelatedArticlesProps {
  articles: ArticleMeta[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-articles-heading" className="mx-auto mt-16 max-w-[1280px]">
      <h2 id="related-articles-heading" className="text-display-sm text-ink">
        Related Articles
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
