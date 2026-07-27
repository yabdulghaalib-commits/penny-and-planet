import type { Metadata } from 'next';
import { TagArchiveView } from '../../_view';
import { getAllTags, getArticlesByTag } from '@/lib/content/query';
import { getStaticPageNumbers } from '@/lib/pagination';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

interface PageProps {
  params: { slug: string; page: string };
  searchParams: { sort?: string };
}

export function generateStaticParams() {
  return getAllTags().flatMap((tag) => {
    const total = getArticlesByTag(tag.slug, 1, ARTICLES_PER_PAGE).totalItems;
    return getStaticPageNumbers(total, ARTICLES_PER_PAGE).map((page) => ({
      slug: tag.slug,
      page: String(page),
    }));
  });
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tag = getAllTags().find((entry) => entry.slug === params.slug);
  if (!tag) return {};

  return {
    title: `#${tag.name} — Page ${params.page}`,
    alternates: { canonical: `/tag/${tag.slug}/page/${params.page}` },
  };
}

export default function TagArchivePagedPage({ params, searchParams }: PageProps) {
  return <TagArchiveView slug={params.slug} page={Number(params.page)} sort={searchParams.sort} />;
}
