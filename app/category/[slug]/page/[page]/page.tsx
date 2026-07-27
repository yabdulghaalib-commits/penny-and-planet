import type { Metadata } from 'next';
import { CategoryArchiveView } from '../../_view';
import { categories } from '@/lib/data/categories';
import { getArticlesByCategory } from '@/lib/content/query';
import { getStaticPageNumbers } from '@/lib/pagination';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';
import type { CategorySlug } from '@/lib/types';

interface PageProps {
  params: { slug: string; page: string };
  searchParams: { sort?: string };
}

export function generateStaticParams() {
  return categories.flatMap((category) => {
    const total = getArticlesByCategory(category.slug, 1, ARTICLES_PER_PAGE).totalItems;
    return getStaticPageNumbers(total, ARTICLES_PER_PAGE).map((page) => ({
      slug: category.slug,
      page: String(page),
    }));
  });
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = categories.find((entry) => entry.slug === params.slug);
  if (!category) return {};

  return {
    title: `${category.name} — Page ${params.page}`,
    alternates: { canonical: `/category/${category.slug}/page/${params.page}` },
  };
}

export default function CategoryArchivePagedPage({ params, searchParams }: PageProps) {
  return <CategoryArchiveView slug={params.slug} page={Number(params.page)} sort={searchParams.sort} />;
}
