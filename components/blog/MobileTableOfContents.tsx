import type { TocItem } from '@/lib/types';

interface MobileTableOfContentsProps {
  items: TocItem[];
}

export function MobileTableOfContents({ items }: MobileTableOfContentsProps) {
  if (items.length < 2) return null;

  return (
    <details className="mx-auto max-w-content-narrow rounded-lg border border-sand-300 bg-white p-4 lg:hidden">
      <summary className="cursor-pointer list-none font-display text-base text-ink marker:content-none">
        On this page
      </summary>
      <ul className="mt-3 space-y-2 border-l border-sand-300 pl-4">
        {items.map((item) => (
          <li key={item.slug} className={item.depth === 3 ? 'ml-3' : undefined}>
            <a href={`#${item.slug}`} className="block text-sm text-ink-muted hover:text-forest-600">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
