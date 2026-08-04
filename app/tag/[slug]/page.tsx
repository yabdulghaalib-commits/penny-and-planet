import type { Metadata } from 'next';
import { TagArchiveView } from './_view';
import { getAllTags } from '@/lib/content/query';

interface PageProps {
  params: { slug: string };
  searchParams: { sort?: string };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const tags = await getAllTags();
  const tag = tags.find((entry) => entry.slug === params.slug);
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
