import type { Metadata } from 'next';
import { AuthorArchiveView } from './_view';
import { getAllAuthors, getAuthorBySlug } from '@/lib/content/authors';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllAuthors().map((author) => ({ slug: author.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};

  return {
    title: author.name,
    description: author.bio,
    alternates: { canonical: `/author/${author.slug}` },
  };
}

export default function AuthorArchivePage({ params }: PageProps) {
  return <AuthorArchiveView slug={params.slug} page={1} />;
}
