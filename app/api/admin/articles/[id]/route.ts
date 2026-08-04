import { NextResponse } from 'next/server';
import { getArticleRowById, updateArticleRow, deleteArticleRow, isSlugTaken, setArticleStatus } from '@/lib/db/articles';
import { adminArticleInputSchema } from '@/lib/admin/validation';
import { calculateReadingTime } from '@/lib/content/reading-time';

interface RouteParams {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteParams) {
  const row = await getArticleRowById(Number(params.id));
  if (!row) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
  return NextResponse.json(row);
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const id = Number(params.id);
  const existing = await getArticleRowById(id);
  if (!existing) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Lightweight status-only update (used by the publish/unpublish toggle in the article list).
  if (typeof body === 'object' && body !== null && 'statusOnly' in body) {
    const status = (body as { status?: unknown }).status;
    if (status !== 'draft' && status !== 'published') {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }
    await setArticleStatus(id, status);
    return NextResponse.json({ success: true });
  }

  const parsed = adminArticleInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' }, { status: 400 });
  }
  const input = parsed.data;

  if (input.slug !== existing.slug && (await isSlugTaken(input.slug, id))) {
    return NextResponse.json({ error: `The slug "${input.slug}" is already in use by another article.` }, { status: 409 });
  }

  const now = new Date().toISOString();
  const wasPublished = existing.status === 'published';
  const isNowPublished = input.status === 'published';

  const row = await updateArticleRow(id, {
    ...input,
    readingTimeMinutes: calculateReadingTime(input.content),
    publishedAt: input.publishedAt || existing.published_at || (isNowPublished ? now : null),
    // Only stamp "updated" once an already-published article is edited again, matching the
    // site's existing "Last updated" convention (first publish shouldn't also show as "updated").
    updatedAt: wasPublished && isNowPublished ? now : (input.updatedAt ?? existing.updated_at),
    canonicalUrl: input.canonicalUrl || null,
  });

  return NextResponse.json(row);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const id = Number(params.id);
  const existing = await getArticleRowById(id);
  if (!existing) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });

  await deleteArticleRow(id);
  return NextResponse.json({ success: true });
}
