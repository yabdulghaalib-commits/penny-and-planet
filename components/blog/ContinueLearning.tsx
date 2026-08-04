import { ArticleCard } from '@/components/ui/ArticleCard';
import { getContinueLearningArticles } from '@/lib/content/recommendations';
import { getCategoryName } from '@/lib/format';
import type { CategorySlug } from '@/lib/types';

interface ContinueLearningProps {
  category: CategorySlug;
  excludeSlug: string;
  limit?: number;
}

/** Suggests articles from topically-related categories (see lib/data/category-relations.ts) rather than more of the same topic. */
export async function ContinueLearning({ category, excludeSlug, limit = 3 }: ContinueLearningProps) {
  const articles = await getContinueLearningArticles(category, excludeSlug, limit);
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="continue-learning-heading" className="mx-auto mt-16 max-w-[1280px]">
      <p className="eyebrow">Keep exploring</p>
      <h2 id="continue-learning-heading" className="mt-2 text-display-sm text-ink">
        Continue Your Learning
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Since you&apos;re reading about {getCategoryName(category)}, here&apos;s what to explore next.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
