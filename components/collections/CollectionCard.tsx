import Link from 'next/link';
import type { Collection } from '@/lib/data/collections';

interface CollectionCardProps {
  collection: Collection;
  articleCount: number;
}

export function CollectionCard({ collection, articleCount }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group flex flex-col gap-3 rounded-lg border border-sand-300 bg-white p-6 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-forest-300 hover:shadow-card"
    >
      <span className="font-mono text-eyebrow uppercase tracking-widest text-forest-500">
        {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
      </span>
      <span className="font-display text-xl text-ink">{collection.title}</span>
      <span className="text-sm text-ink-muted">{collection.description}</span>
      <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-forest-700">
        Start learning
        <svg viewBox="0 0 16 16" className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
