import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { ArticleHeader } from '@/components/blog/ArticleHeader';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { getArticleRowById, rowToArticleMeta } from '@/lib/db/articles';
import { getAuthorBySlugOrFallback } from '@/lib/content/authors';
import { extractTableOfContents } from '@/lib/content/toc';

export default async function PreviewArticlePage({ params }: { params: { id: string } }) {
  const row = await getArticleRowById(Number(params.id));
  if (!row) notFound();

  const meta = rowToArticleMeta(row);
  const { authorSlug, ...rest } = meta;
  const article = {
    ...rest,
    author: getAuthorBySlugOrFallback(authorSlug),
    rawContent: row.content,
    toc: extractTableOfContents(row.content),
  };

  return (
    <div className="-mx-5 -my-10 bg-sand-100 py-8 sm:-mx-8 lg:py-12">
      <Container>
        <div className="mb-6 rounded-md bg-gold-100 px-4 py-3 text-center text-sm font-medium text-forest-800">
          Preview mode. {row.status === 'draft' ? 'This article is a draft and is not live.' : 'This reflects the currently published version.'}
        </div>

        <ArticleHeader article={article} />

        <div className="mx-auto mt-10 grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_220px]">
          <ArticleBody rawContent={article.rawContent} />
          <TableOfContents items={article.toc} />
        </div>
      </Container>
    </div>
  );
}
