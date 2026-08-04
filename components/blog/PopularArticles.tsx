import Image from 'next/image';
import Link from 'next/link';
import type { ArticleMeta } from '@/lib/types';
import { articleHref, formatDate } from '@/lib/format';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { getPopularArticles } from '@/lib/content/query';

interface PopularArticlesProps {
  variant?: 'grid' | 'compact';
  limit?: number;
  title?: string;
}

/**
 * Reusable sitewide — grid variant for a standalone section (search page,
 * category pages), compact variant for tight spaces (sidebar, article
 * page). Backed by `getPopularArticles`, which is analytics-ready per
 * lib/content/query.ts — swapping in real pageview data later means this
 * component never has to change.
 */
export async function PopularArticles({ variant = 'grid', limit = variant === 'compact' ? 4 : 6, title = 'Popular Articles' }: PopularArticlesProps) {
  const articles = await getPopularArticles(limit);
  if (articles.length === 0) return null;

  if (variant === 'compact') {
    return (
      <div>
        <p className="eyebrow">{title}</p>
        <ul className="mt-3 space-y-4">
          {articles.map((article) => (
            <CompactArticleRow key={article.slug} article={article} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section aria-labelledby="popular-articles-heading">
      <h2 id="popular-articles-heading" className="text-display-sm text-ink">
        {title}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

export function CompactArticleRow({ article }: { article: ArticleMeta }) {
  const href = articleHref(article.category, article.slug);
  return (
    <li>
      <Link href={href} className="group flex items-start gap-3">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
          <Image src={article.featuredImageUrl} alt="" fill sizes="56px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-ink group-hover:text-forest-700">{article.title}</p>
          <p className="mt-1 text-xs text-ink-muted">
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            {' · '}
            {article.readingTimeMinutes} min read
          </p>
        </div>
      </Link>
    </li>
  );
}
