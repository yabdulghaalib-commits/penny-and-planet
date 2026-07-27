import Image from 'next/image';
import Link from 'next/link';
import type { Article } from '@/lib/types';
import { authorHref, formatDate, getCategoryName, categoryHref } from '@/lib/format';
import { Badge } from '@/components/ui/Badge';

interface ArticleHeaderProps {
  article: Article;
}

export function ArticleHeader({ article }: ArticleHeaderProps) {
  return (
    <header className="mx-auto max-w-content-narrow">
      <Link href={categoryHref(article.category)}>
        <Badge>{getCategoryName(article.category)}</Badge>
      </Link>

      <h1 className="mt-4 text-display-md text-ink sm:text-display-lg">{article.title}</h1>

      <p className="mt-4 text-body-lg text-ink-muted">{article.excerpt}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-sand-300 py-4">
        <Link href={authorHref(article.author.slug)} className="flex items-center gap-3">
          <Image
            src={article.author.avatarUrl}
            alt=""
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover"
          />
          <span>
            <span className="block text-sm font-medium text-ink">{article.author.name}</span>
            <span className="block text-xs text-ink-muted">
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              {' · '}
              {article.readingTimeMinutes} min read
            </span>
          </span>
        </Link>

        {article.updatedAt && article.updatedAt !== article.publishedAt && (
          <span className="text-xs text-ink-muted">
            Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
          </span>
        )}
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
        <Image
          src={article.featuredImageUrl}
          alt={article.featuredImageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>
    </header>
  );
}
