import { notFound } from 'next/navigation';
import { ArticleListingPage } from '@/components/blog/ArticleListingPage';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { RelatedCategories } from '@/components/blog/RelatedCategories';
import { Sidebar } from '@/components/blog/Sidebar';
import { ArticleSortControl } from '@/components/blog/ArticleSortControl';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { getAllArticleMeta } from '@/lib/content/articles';
import { getArticlesByCategory } from '@/lib/content/query';
import { sortArticles, isArticleSortOption } from '@/lib/content/sorting';
import { categories } from '@/lib/data/categories';
import { categoryPageHref } from '@/lib/format';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';
import type { CategorySlug } from '@/lib/types';

export async function CategoryArchiveView({ slug, page, sort }: { slug: string; page: number; sort?: string }) {
  const category = categories.find((entry) => entry.slug === slug);
  if (!category) notFound();

  const sortOption = isArticleSortOption(sort) ? sort : 'recent';
  const all = await getAllArticleMeta();
  const allInCategory = all.filter((article) => article.category === category.slug);
  const sorted = sortArticles(allInCategory, sortOption);
  const featured = page === 1 ? (sorted.find((article) => article.featured) ?? sorted[0]) : undefined;

  const result = await getArticlesByCategory(category.slug as CategorySlug, page, ARTICLES_PER_PAGE);
  if (page > 1 && page > result.totalPages) notFound();
  const pagedArticles = sortArticles(result.items, sortOption);
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: category.name }];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleListingPage
        headingId="category-heading"
        eyebrow="Category"
        title={category.name}
        description={`${category.description} · ${allInCategory.length} ${allInCategory.length === 1 ? 'article' : 'articles'}`}
        articles={pagedArticles}
        currentPage={result.currentPage}
        totalPages={result.totalPages}
        hrefForPage={(pageNumber) => categoryPageHref(category.slug as CategorySlug, pageNumber)}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        controls={<ArticleSortControl />}
        sidebar={<Sidebar />}
        beforeGrid={
          featured ? (
            <div>
              <p className="eyebrow mb-4">Featured in {category.name}</p>
              <div className="max-w-md">
                <ArticleCard article={featured} variant="featured" />
              </div>
            </div>
          ) : undefined
        }
        afterGrid={<RelatedCategories category={category.slug as CategorySlug} />}
      />
    </>
  );
}
