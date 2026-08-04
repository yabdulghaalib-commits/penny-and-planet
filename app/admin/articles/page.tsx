import Link from 'next/link';
import { getAllArticleRows } from '@/lib/db/articles';
import { ArticleTable } from '@/components/admin/ArticleTable';

export default async function AdminArticlesPage() {
  const articles = await getAllArticleRows();
  const publishedCount = articles.filter((a) => a.status === 'published').length;
  const draftCount = articles.length - publishedCount;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-ink">Articles</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {articles.length} total · {publishedCount} published · {draftCount} draft{draftCount === 1 ? '' : 's'}
          </p>
        </div>
        <Link href="/admin/articles/new" className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-600">
          New Article
        </Link>
      </div>

      <div className="mt-6">
        <ArticleTable articles={articles} />
      </div>
    </div>
  );
}
