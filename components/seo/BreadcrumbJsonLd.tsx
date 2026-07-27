import { siteConfig } from '@/lib/config/site';
import type { BreadcrumbItem } from '@/components/blog/Breadcrumbs';

/**
 * Builds schema.org BreadcrumbList JSON-LD from the same `items` array the
 * visual `Breadcrumbs` component renders, so the two never drift out of
 * sync. `items` should include the current page as the last, href-less
 * entry — its position is inferred from array order.
 */
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteConfig.url}${item.href}` : undefined,
    })),
  };
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    // eslint-disable-next-line react/no-danger -- static, server-generated structured data
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(items)) }} />
  );
}
