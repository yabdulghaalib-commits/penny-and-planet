import type { Metadata } from 'next';
import { CategoryArchiveView } from './_view';
import { categories } from '@/lib/data/categories';

interface PageProps {
  params: { slug: string };
  searchParams: { sort?: string };
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = categories.find((entry) => entry.slug === params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/category/${category.slug}` },
  };
}

export default function CategoryArchivePage({ params, searchParams }: PageProps) {
  return <CategoryArchiveView slug={params.slug} page={1} sort={searchParams.sort} />;
}
