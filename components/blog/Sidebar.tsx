import Link from 'next/link';
import { PopularArticles } from '@/components/blog/PopularArticles';
import { SidebarNewsletterForm } from '@/components/blog/SidebarNewsletterForm';
import { AdSlot } from '@/components/blog/monetization/AdSlot';
import { getCategoriesWithCounts, getAllTags } from '@/lib/content/query';
import { getAllResources } from '@/lib/content/resources';
import { collections } from '@/lib/data/collections';
import { categoryHref, tagHref } from '@/lib/format';

interface SidebarBlockProps {
  title: string;
  children: React.ReactNode;
}

function SidebarBlock({ title, children }: SidebarBlockProps) {
  return (
    <div className="rounded-lg border border-sand-300 bg-white p-5">
      <p className="eyebrow">{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/**
 * Composite sidebar used on discovery-oriented pages (search, category,
 * tag, author archives). Each block is independent — pages needing only
 * part of this (e.g. just Popular Articles) should use that component
 * directly instead of the full Sidebar.
 */
export async function Sidebar() {
  const categoriesWithCounts = await getCategoriesWithCounts();
  const allTags = await getAllTags();
  const tags = allTags.slice(0, 16);
  const resources = getAllResources().slice(0, 3);

  return (
    <aside className="space-y-5">
      <SidebarBlock title="Search">
        <form action="/search" method="GET" className="flex gap-2">
          <label htmlFor="sidebar-search" className="sr-only">
            Search articles
          </label>
          <input
            id="sidebar-search"
            type="search"
            name="q"
            placeholder="Search articles…"
            className="w-full rounded-full border border-sand-300 bg-white px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-forest-500 focus:outline-none"
          />
          <button type="submit" className="shrink-0 rounded-full bg-forest-700 px-4 py-2 text-sm font-medium text-white hover:bg-forest-600">
            Go
          </button>
        </form>
      </SidebarBlock>

      <SidebarBlock title="Newsletter">
        <p className="mb-3 text-sm text-ink-muted">Weekly tips on money and sustainable living.</p>
        <SidebarNewsletterForm />
      </SidebarBlock>

      <SidebarBlock title="Popular Articles">
        <PopularArticles variant="compact" title="" limit={4} />
      </SidebarBlock>

      <SidebarBlock title="Featured Collections">
        <ul className="space-y-2">
          {collections.slice(0, 5).map((collection) => (
            <li key={collection.slug}>
              <Link href={`/collections/${collection.slug}`} className="text-sm text-ink-soft hover:text-forest-700">
                {collection.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/collections" className="mt-3 inline-block text-sm font-medium text-forest-700 hover:text-forest-600">
          View all collections →
        </Link>
      </SidebarBlock>

      <SidebarBlock title="Categories">
        <ul className="space-y-1.5">
          {categoriesWithCounts.map((category) => (
            <li key={category.slug}>
              <Link href={categoryHref(category.slug)} className="flex items-center justify-between text-sm text-ink-soft hover:text-forest-700">
                <span>{category.name}</span>
                <span className="text-ink-muted">{category.articleCount}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SidebarBlock>

      {tags.length > 0 && (
        <SidebarBlock title="Tags">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={tagHref(tag.slug)}
                className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-ink-soft hover:bg-sage-100 hover:text-forest-700"
              >
                {tag.name}
              </Link>
            ))}
          </div>
        </SidebarBlock>
      )}

      {resources.length > 0 && (
        <SidebarBlock title="Free Resources">
          <ul className="space-y-3">
            {resources.map((resource) => (
              <li key={resource.slug}>
                <a href={resource.fileUrl} download className="text-sm font-medium text-ink-soft hover:text-forest-700">
                  {resource.title}
                </a>
                <p className="text-xs text-ink-muted">{resource.description}</p>
              </li>
            ))}
          </ul>
        </SidebarBlock>
      )}

      {/* Reserved for future display advertising — see components/blog/monetization/AdSlot.tsx */}
      <AdSlot position="sidebar" />
    </aside>
  );
}
