import Link from 'next/link';
import type { ArticleRow } from '@/lib/db/articles';
import { PublishToggle } from '@/components/admin/PublishToggle';
import { DeleteArticleButton } from '@/components/admin/DeleteArticleButton';

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function ArticleTable({ articles }: { articles: ArticleRow[] }) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-sand-400 bg-white p-10 text-center text-ink-muted">
        No articles yet. <Link href="/admin/articles/new" className="text-forest-700 underline">Create the first one.</Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-sand-300 bg-white">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-sand-100 text-xs uppercase tracking-wide text-ink-muted">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Updated</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t border-sand-200">
              <td className="max-w-xs px-4 py-3">
                <p className="truncate font-medium text-ink">{article.title}</p>
                <p className="truncate text-xs text-ink-muted">/{article.category}/{article.slug}</p>
              </td>
              <td className="px-4 py-3 text-ink-soft">{article.category}</td>
              <td className="px-4 py-3">
                <PublishToggle id={article.id} status={article.status} />
              </td>
              <td className="px-4 py-3 text-ink-muted">{formatDate(article.updated_at ?? article.created_at)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link href={`/admin/articles/${article.id}/preview`} className="text-xs font-medium text-ink-soft hover:text-forest-700">
                    Preview
                  </Link>
                  <Link href={`/admin/articles/${article.id}/edit`} className="text-xs font-medium text-forest-700 hover:text-forest-600">
                    Edit
                  </Link>
                  <DeleteArticleButton id={article.id} title={article.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
