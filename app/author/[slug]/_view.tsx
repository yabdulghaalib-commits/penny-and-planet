import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Pagination } from '@/components/blog/Pagination';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { PersonJsonLd } from '@/components/seo/PersonJsonLd';
import { Sidebar } from '@/components/blog/Sidebar';
import { getAuthorBySlug } from '@/lib/content/authors';
import { getArticlesByAuthor } from '@/lib/content/query';
import { authorPageHref } from '@/lib/format';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

export async function AuthorArchiveView({ slug, page }: { slug: string; page: number }) {
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const result = await getArticlesByAuthor(author.slug, page, ARTICLES_PER_PAGE);
  if (page > 1 && page > result.totalPages) notFound();

  return (
    <div className="py-12 lg:py-16">
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }, { label: author.name }]} />
      <PersonJsonLd author={author} />
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: author.name }]} />

        <div className="mx-auto mt-6 flex max-w-2xl flex-col items-center text-center">
          <Image
            src={author.avatarUrl}
            alt=""
            width={88}
            height={88}
            className="h-22 w-22 rounded-full object-cover"
          />
          <p className="eyebrow mt-5">Author</p>
          <h1 id="author-heading" className="mt-2 text-display-md text-ink sm:text-display-lg">
            {author.name}
          </h1>
          {author.credentials && <p className="mt-1 text-sm text-ink-muted">{author.credentials}</p>}
          <p className="mt-4 text-body-base text-ink-muted">{author.bio}</p>

          {author.expertise && author.expertise.length > 0 && (
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {author.expertise.map((area) => (
                <li key={area} className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-forest-700">
                  {area}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-5 font-mono text-eyebrow uppercase tracking-widest text-forest-500">
            {result.totalItems} Published {result.totalItems === 1 ? 'Article' : 'Articles'}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            {result.items.length > 0 ? (
              <>
                <h2 className="text-display-sm text-ink">Latest Articles</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                  {result.items.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
                <Pagination
                  currentPage={result.currentPage}
                  totalPages={result.totalPages}
                  hrefForPage={(pageNumber) => authorPageHref(author.slug, pageNumber)}
                />
              </>
            ) : (
              <p className="text-center text-ink-muted">No articles published yet.</p>
            )}
          </div>
          <Sidebar />
        </div>
      </Container>
    </div>
  );
}
