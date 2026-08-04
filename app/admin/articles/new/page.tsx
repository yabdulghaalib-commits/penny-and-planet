import { ArticleForm } from '@/components/admin/ArticleForm';
import { categories } from '@/lib/data/categories';
import { getAllAuthors } from '@/lib/content/authors';

export default function NewArticlePage() {
  const authors = getAllAuthors().map((author) => ({ slug: author.slug, name: author.name }));

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">New Article</h1>
      <div className="mt-6">
        <ArticleForm categories={categories} authors={authors} />
      </div>
    </div>
  );
}
