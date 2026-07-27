import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { collections } from '@/lib/data/collections';
import { getCollectionArticles } from '@/lib/content/query';

export const metadata: Metadata = {
  title: 'Featured Collections',
  description: 'Curated learning paths through Penny and Planet\u2019s guides on money and sustainable living.',
  alternates: { canonical: '/collections' },
};

export default function CollectionsIndexPage() {
  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Learning paths</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">Featured Collections</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            Curated groups of articles that walk you through a topic step by step — pick a path and work
            through it at your own pace.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.slug}
              collection={collection}
              articleCount={getCollectionArticles(collection).length}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
