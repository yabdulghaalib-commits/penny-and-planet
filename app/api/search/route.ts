import { NextResponse, type NextRequest } from 'next/server';
import { searchArticles } from '@/lib/services/search';
import { isArticleSortOption } from '@/lib/content/sorting';
import type { CategorySlug } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sortParam = searchParams.get('sort');

  const results = await searchArticles({
    query: searchParams.get('q') ?? undefined,
    category: (searchParams.get('category') as CategorySlug | null) ?? undefined,
    tag: searchParams.get('tag') ?? undefined,
    sort: isArticleSortOption(sortParam) ? sortParam : undefined,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
  });

  return NextResponse.json(results);
}
