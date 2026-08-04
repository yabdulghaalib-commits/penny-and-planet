import type { Metadata } from 'next';
import { TagArchiveView } from '../../_view';
import { getAllTags, getArticlesByTag } from '@/lib/content/query';
import { getStaticPageNumbers } from '@/lib/pagination';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

interface PageProps {
  params: { slug: string; page: string };
  searchParams: { sort?: string };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  const perTagParams = await Promise.all(
    tags.map(async (tag) => {
      const total = (await getArticlesByTag(tag.slug, 1, ARTICLES_PER_PAGE)).totalItems;
      return getStaticPageNumbers(total, ARTICLES_PER_PAGE).map((page) => ({
        slug: tag.slug,
        page: String(page),
      }));
    }),
  );
  return perTagParams.flat();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tags = await getAllTags();
  const tag = tags.find((entry) => entry.slug === params.slug);
  if (!tag) return {};

  return {
    title: `#${tag.name} — Page ${params.page}`,
    alternates: { canonical: `/tag/${tag.slug}/page/${params.page}` },
  };
}

export default function TagArchivePagedPage({ params, searchParams }: PageProps) {
  return <TagArchiveView slug={params.slug} page={Number(params.page)} sort={searchParams.sort} />;
}
