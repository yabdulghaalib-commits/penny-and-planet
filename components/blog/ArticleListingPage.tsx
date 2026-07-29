import { Suspense } from 'react';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Pagination } from '@/components/blog/Pagination';
import type { ArticleMeta } from '@/lib/types';

interface ArticleListingPageProps {
  eyebrow: string;
  title: string;
  description?: string;
  articles: ArticleMeta[];
  currentPage: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
  headingId: string;
  /** Optional sidebar (e.g. the shared Sidebar component) — renders as a second column on lg+, stacks below the grid on smaller screens. */
  sidebar?: React.ReactNode;
  /** Optional controls (e.g. ArticleSortControl) rendered above the grid, right-aligned. */
  controls?: React.ReactNode;
  /** Optional content rendered between the hero and the article grid — e.g. a featured-article highlight. */
  beforeGrid?: React.ReactNode;
  /** Optional content rendered after pagination — e.g. Related Categories. */
  afterGrid?: React.ReactNode;
  /** Optional breadcrumb trail rendered above the heading. */
  breadcrumbs?: React.ReactNode;
}

export function ArticleListingPage({
  eyebrow,
  title,
  description,
  articles,
  currentPage,
  totalPages,
  hrefForPage,
  headingId,
  sidebar,
  controls,
  beforeGrid,
  afterGrid,
  breadcrumbs,
}: ArticleListingPageProps) {
  const grid = (
    <>
      {articles.length > 0 ? (
        <>
          {controls && <div className="mb-6 flex justify-end"><Suspense fallback={null}>{controls}</Suspense></div>}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} hrefForPage={hrefForPage} />
        </>
      ) : (
        <p className="text-center text-ink-muted">No articles here yet. Check back soon.</p>
      )}
    </>
  );

  return (
    <div className="py-16 lg:py-20">
      <Container>
        {breadcrumbs && <div className="mb-6">{breadcrumbs}</div>}

        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={headingId} className="mt-2 text-display-md text-ink sm:text-display-lg">
            {title}
          </h1>
          {description && <p className="mt-4 text-body-base text-ink-muted">{description}</p>}
        </div>

        {beforeGrid && <div className="mt-12">{beforeGrid}</div>}

        {sidebar ? (
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px]">
            <div>{grid}</div>
            {sidebar}
          </div>
        ) : (
          <div className="mt-12">{grid}</div>
        )}

        {afterGrid}
      </Container>
    </div>
  );
}
