import { notFound } from 'next/navigation';
import { ArticleForm } from '@/components/admin/ArticleForm';
import { getArticleRowById } from '@/lib/db/articles';
import { categories } from '@/lib/data/categories';
import { getAllAuthors } from '@/lib/content/authors';

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await getArticleRowById(Number(params.id));
  if (!article) notFound();

  const authors = getAllAuthors().map((author) => ({ slug: author.slug, name: author.name }));

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit Article</h1>
      <div className="mt-6">
        <ArticleForm categories={categories} authors={authors} article={article} />
      </div>
    </div>
  );
}
