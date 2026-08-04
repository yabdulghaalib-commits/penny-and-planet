import type { Metadata } from 'next';
import { ArticlesIndexView } from '../../_view';
import { getAllArticleMeta } from '@/lib/content/articles';
import { getStaticPageNumbers } from '@/lib/pagination';
import { ARTICLES_PER_PAGE } from '@/lib/config/site';

interface PageProps {
  params: { page: string };
}

export async function generateStaticParams() {
  const all = await getAllArticleMeta();
  return getStaticPageNumbers(all.length, ARTICLES_PER_PAGE).map((page) => ({
    page: String(page),
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `All Articles — Page ${params.page}`,
    alternates: { canonical: `/articles/page/${params.page}` },
  };
}

export default function ArticlesIndexPagedPage({ params }: PageProps) {
  return <ArticlesIndexView page={Number(params.page)} />;
}
