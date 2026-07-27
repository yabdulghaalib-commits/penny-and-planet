import Image from 'next/image';
import Link from 'next/link';
import type { SearchResultItem } from '@/lib/services/search';
import { formatDate } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

interface SearchResultCardProps {
  result: SearchResultItem;
}

/** Same visual design as components/ui/ArticleCard — kept as a separate component because it's rendered from a client component and can't do server-side (fs) author lookups. */
export function SearchResultCard({ result }: SearchResultCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-subtle ring-1 ring-sand-300 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:shadow-card">
      <Link href={result.url} className="relative block aspect-[4/3] w-full overflow-hidden" tabIndex={-1}>
        <Image
          src={result.featuredImageUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge>{result.categoryLabel}</Badge>

        <h3 className="font-display text-lg leading-snug text-ink">
          <Link href={result.url} className="transition-colors hover:text-forest-700">
            {result.title}
          </Link>
        </h3>

        <p className="flex-1 text-sm text-ink-muted">{result.excerpt}</p>

        <div className="flex items-center justify-between gap-3 border-t border-sand-200 pt-3">
          <div className="flex flex-col text-xs text-ink-muted">
            <span className="font-medium text-ink-soft">{result.authorName}</span>
            <span>
              <time dateTime={result.publishedAt}>{formatDate(result.publishedAt)}</time>
              {' · '}
              {result.readingTimeMinutes} min read
            </span>
          </div>

          <Link
            href={result.url}
            className="whitespace-nowrap text-sm font-medium text-forest-700 underline decoration-forest-300 underline-offset-4 transition-colors hover:decoration-forest-600"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
