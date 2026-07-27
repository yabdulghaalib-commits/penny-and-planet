import Image from 'next/image';
import Link from 'next/link';
import type { ArticleMeta } from '@/lib/types';
import { articleHref, formatDate, getCategoryName } from '@/lib/format';
import { getAuthorBySlugOrFallback } from '@/lib/content/authors';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: ArticleMeta;
  variant?: 'featured' | 'default';
  /** Marks the image as high priority for LCP (use for the first visible card only). */
  priority?: boolean;
}

export function ArticleCard({ article, variant = 'default', priority = false }: ArticleCardProps) {
  const isFeatured = variant === 'featured';
  const href = articleHref(article.category, article.slug);
  const author = getAuthorBySlugOrFallback(article.authorSlug);

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-subtle ring-1 ring-sand-300 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:shadow-card',
      )}
    >
      <Link href={href} className="relative block aspect-[4/3] w-full overflow-hidden" tabIndex={-1}>
        <Image
          src={article.featuredImageUrl}
          alt=""
          fill
          priority={priority}
          sizes={isFeatured ? '(min-width: 1024px) 33vw, 100vw' : '(min-width: 1024px) 25vw, 100vw'}
          className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
        />
      </Link>

      <div className={cn('flex flex-1 flex-col gap-3 p-5', isFeatured && 'p-6')}>
        <Badge>{getCategoryName(article.category)}</Badge>

        <h3 className={cn('font-display leading-snug text-ink', isFeatured ? 'text-display-sm' : 'text-lg')}>
          <Link href={href} className="hover:text-forest-700 transition-colors">
            {article.title}
          </Link>
        </h3>

        <p className={cn('flex-1 text-ink-muted', isFeatured ? 'text-body-base' : 'text-sm')}>
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between gap-3 border-t border-sand-200 pt-3">
          <div className="flex flex-col text-xs text-ink-muted">
            <span className="font-medium text-ink-soft">{author.name}</span>
            <span>
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {' · '}
              {article.readingTimeMinutes} min read
            </span>
          </div>

          <Link
            href={href}
            className="whitespace-nowrap text-sm font-medium text-forest-700 underline decoration-forest-300 underline-offset-4 transition-colors hover:decoration-forest-600"
          >
            Read Article
          </Link>
        </div>
      </div>
    </article>
  );
}
