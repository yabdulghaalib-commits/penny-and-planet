import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/blog/Breadcrumbs';
import { BreadcrumbJsonLd } from '@/components/seo/BreadcrumbJsonLd';
import { SidebarNewsletterForm } from '@/components/blog/SidebarNewsletterForm';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { getAllResources, getResourceBySlug } from '@/lib/content/resources';
import { getResourceCollectionBySlug } from '@/lib/data/resource-collections';
import { siteConfig } from '@/lib/config/site';

interface ResourcePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllResources().map((resource) => ({ slug: resource.slug }));
}

export function generateMetadata({ params }: ResourcePageProps): Metadata {
  const resource = getResourceBySlug(params.slug);
  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: resource.previewImage ? { images: [{ url: resource.previewImage }] } : undefined,
  };
}

export default function ResourcePage({ params }: ResourcePageProps) {
  const resource = getResourceBySlug(params.slug);
  if (!resource) notFound();

  const collection = resource.collection ? getResourceCollectionBySlug(resource.collection) : undefined;
  const moreInCollection = getAllResources()
    .filter((entry) => entry.collection === resource.collection && entry.slug !== resource.slug)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Resource Library', href: '/resources' },
    ...(collection ? [{ label: collection.title, href: `/resources#collection-${collection.slug}` }] : []),
    { label: resource.title },
  ];

  return (
    <div className="py-12 lg:py-16">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Container>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mx-auto mt-8 grid max-w-4xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-sand-100">
            {resource.previewImage && (
              <Image
                src={resource.previewImage}
                alt={`Preview of ${resource.title}`}
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
                priority
              />
            )}
          </div>

          <div>
            {collection && <p className="eyebrow">{collection.title}</p>}
            <h1 className="mt-2 text-display-md text-ink sm:text-display-lg">{resource.title}</h1>
            <p className="mt-4 text-body-base text-ink-muted">{resource.description}</p>

            <a
              href={resource.fileUrl}
              download
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-body-base font-medium text-white transition-colors hover:bg-forest-600"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M10 3v10m0 0 4-4m-4 4-4-4M4 16h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download {resource.fileType.toUpperCase()}
            </a>

            <div className="mt-8 rounded-lg border border-sand-300 bg-sand-100 p-5">
              <p className="text-sm font-medium text-ink">Want more free resources like this?</p>
              <p className="mt-1 text-sm text-ink-muted">
                Join the newsletter for new planners, trackers, and guides as we publish them — totally optional.
              </p>
              <div className="mt-3">
                <SidebarNewsletterForm />
              </div>
            </div>
          </div>
        </div>

        {moreInCollection.length > 0 && (
          <section aria-labelledby="more-resources-heading" className="mx-auto mt-16 max-w-5xl">
            <h2 id="more-resources-heading" className="text-display-sm text-ink">
              More from {collection?.title}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {moreInCollection.map((entry) => (
                <ResourceCard key={entry.slug} resource={entry} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
