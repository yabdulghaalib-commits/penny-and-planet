import type { Metadata } from 'next';
import { AuthorArchiveView } from '../../_view';
import { getAllAuthors, getAuthorBySlug } from '@/lib/content/authors';
import { getArticlesByAuthor } from '@/lib/content/query';
import { getStaticPageNumbers } from '@/lib/pagination';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

interface PageProps {
  params: { slug: string; page: string };
}

export function generateStaticParams() {
  return getAllAuthors().flatMap((author) => {
    const total = getArticlesByAuthor(author.slug, 1, ARTICLES_PER_PAGE).totalItems;
    return getStaticPageNumbers(total, ARTICLES_PER_PAGE).map((page) => ({
      slug: author.slug,
      page: String(page),
    }));
  });
}

export function generateMetadata({ params }: PageProps): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};

  return {
    title: `${author.name} — Page ${params.page}`,
    alternates: { canonical: `/author/${author.slug}/page/${params.page}` },
  };
}

export default function AuthorArchivePagedPage({ params }: PageProps) {
  return <AuthorArchiveView slug={params.slug} page={Number(params.page)} />;
}
