import type { Metadata } from 'next';
import { TagArchiveView } from './_view';
import { getAllTags } from '@/lib/content/query';

interface PageProps {
  params: { slug: string };
  searchParams: { sort?: string };
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ slug: tag.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tag = getAllTags().find((entry) => entry.slug === params.slug);
  if (!tag) return {};

  return {
    title: `#${tag.name}`,
    description: `Articles tagged "${tag.name}" on Penny and Planet.`,
    alternates: { canonical: `/tag/${tag.slug}` },
  };
}

export default function TagArchivePage({ params, searchParams }: PageProps) {
  return <TagArchiveView slug={params.slug} page={1} sort={searchParams.sort} />;
}
