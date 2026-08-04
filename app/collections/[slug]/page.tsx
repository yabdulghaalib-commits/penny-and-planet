import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { collections, getCollectionBySlug } from '@/lib/data/collections';
import { getCollectionArticles } from '@/lib/content/query';

interface CollectionPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) return {};

  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();

  const articles = await getCollectionArticles(collection);
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: collection.title },
  ];

  return (
    <div className="py-12 lg:py-16">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mx-auto mt-6 max-w-2xl text-center">
          <p className="eyebrow">Learning path</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">{collection.title}</h1>
          <p className="mt-4 text-body-base text-ink-muted">{collection.description}</p>
          <p className="mt-4 font-mono text-eyebrow uppercase tracking-widest text-forest-500">
            {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-ink-muted">No articles in this collection yet. Check back soon.</p>
        )}
      </Container>
    </div>
  );
}
