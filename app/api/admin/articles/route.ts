import { NextResponse } from 'next/server';
import { getAllArticleRows, createArticleRow, isSlugTaken } from '@/lib/db/articles';
import { adminArticleInputSchema } from '@/lib/admin/validation';
import { calculateReadingTime } from '@/lib/content/reading-time';

export async function GET() {
  const rows = await getAllArticleRows();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = adminArticleInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input.' }, { status: 400 });
  }
  const input = parsed.data;

  if (await isSlugTaken(input.slug)) {
    return NextResponse.json({ error: `The slug "${input.slug}" is already in use by another article.` }, { status: 409 });
  }

  const now = new Date().toISOString();
  const row = await createArticleRow({
    ...input,
    readingTimeMinutes: calculateReadingTime(input.content),
    publishedAt: input.publishedAt || (input.status === 'published' ? now : null),
    canonicalUrl: input.canonicalUrl || null,
  });

  return NextResponse.json(row, { status: 201 });
}
