'use client';

import type { TocItem } from '@/lib/types';
import { useActiveHeading } from '@/hooks/useActiveHeading';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const activeId = useActiveHeading(items.map((item) => item.slug));

  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <p className="eyebrow">On this page</p>
      <ul className="mt-3 space-y-2 border-l border-sand-300 pl-4">
        {items.map((item) => (
          <li key={item.slug} className={item.depth === 3 ? 'ml-3' : undefined}>
            <a
              href={`#${item.slug}`}
              aria-current={activeId === item.slug ? 'location' : undefined}
              className={cn(
                'block text-sm leading-snug transition-colors',
                activeId === item.slug ? 'font-medium text-forest-700' : 'text-ink-muted hover:text-forest-600',
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
