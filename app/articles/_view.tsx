import { notFound } from 'next/navigation';
import { ArticleListingPage } from '@/components/blog/ArticleListingPage';
import { TrendingArticles } from '@/components/blog/TrendingArticles';
import { getAllArticleMeta } from '@/lib/content/articles';
import { paginate } from '@/lib/pagination';
import { articlesIndexHref } from '@/lib/format';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

export function ArticlesIndexView({ page }: { page: number }) {
  const result = paginate(getAllArticleMeta(), page, ARTICLES_PER_PAGE);
  if (page > 1 && page > result.totalPages) notFound();

  return (
    <ArticleListingPage
      headingId="articles-heading"
      eyebrow="Every guide, in one place"
      title="All Articles"
      description="Browse every Penny and Planet guide on money and sustainable living."
      articles={result.items}
      currentPage={result.currentPage}
      totalPages={result.totalPages}
      hrefForPage={articlesIndexHref}
      beforeGrid={page === 1 ? <TrendingArticles limit={3} /> : undefined}
    />
  );
}
