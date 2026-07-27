import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { getAllResources } from '@/lib/content/resources';
import { resourceCollections } from '@/lib/data/resource-collections';

export const metadata: Metadata = {
  title: 'Resource Library',
  description: 'Free budget planners, savings trackers, checklists, and guides for money and sustainable living.',
  alternates: { canonical: '/resources' },
};

export default function ResourceLibraryPage() {
  const resources = getAllResources();

  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Free downloads</p>
          <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">Resource Library</h1>
          <p className="mt-4 text-body-base text-ink-muted">
            Planners, trackers, and checklists to help you put what you read into practice.
          </p>
        </div>

        <div className="mt-14 space-y-14">
          {resourceCollections.map((collection) => {
            const items = resources.filter((resource) => resource.collection === collection.slug);
            if (items.length === 0) return null;

            return (
              <section key={collection.slug} aria-labelledby={`collection-${collection.slug}`}>
                <h2 id={`collection-${collection.slug}`} className="text-display-sm text-ink">
                  {collection.title}
                </h2>
                <p className="mt-1 text-sm text-ink-muted">{collection.description}</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {items.map((resource) => (
                    <ResourceCard key={resource.slug} resource={resource} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
