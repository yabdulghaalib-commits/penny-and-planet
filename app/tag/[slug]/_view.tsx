import { notFound } from 'next/navigation';
import { ArticleListingPage } from '@/components/blog/ArticleListingPage';
import { Sidebar } from '@/components/blog/Sidebar';
import { ArticleSortControl } from '@/components/blog/ArticleSortControl';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { getArticlesByTag, getAllTags } from '@/lib/content/query';
import { sortArticles, isArticleSortOption } from '@/lib/content/sorting';
import { tagPageHref } from '@/lib/format';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

export function TagArchiveView({ slug, page, sort }: { slug: string; page: number; sort?: string }) {
  const tag = getAllTags().find((entry) => entry.slug === slug);
  if (!tag) notFound();

  const sortOption = isArticleSortOption(sort) ? sort : 'recent';
  const result = getArticlesByTag(tag.slug, page, ARTICLES_PER_PAGE);
  if (page > 1 && page > result.totalPages) notFound();
  const articles = sortArticles(result.items, sortOption);
  const breadcrumbItems = [{ label: 'Home', href: '/' }, { label: `#${tag.name}` }];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleListingPage
        headingId="tag-heading"
        eyebrow="Tag"
        title={`#${tag.name}`}
        description={`${result.totalItems} ${result.totalItems === 1 ? 'article' : 'articles'} tagged "${tag.name}".`}
        articles={articles}
        currentPage={result.currentPage}
        totalPages={result.totalPages}
        hrefForPage={(pageNumber) => tagPageHref(tag.slug, pageNumber)}
        breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
        controls={<ArticleSortControl />}
        sidebar={<Sidebar />}
      />
    </>
  );
}
