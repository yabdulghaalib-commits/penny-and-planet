import { NextResponse, type NextRequest } from 'next/server';
import { searchUnsplash } from '@/lib/media/providers/unsplash';
import { searchPexels } from '@/lib/media/providers/pexels';
import { searchPixabay } from '@/lib/media/providers/pixabay';
import type { MediaProvider, MediaSearchResult } from '@/lib/media/types';

const SEARCH_FUNCTIONS: Record<MediaProvider, (query: string) => Promise<MediaSearchResult[]>> = {
  unsplash: searchUnsplash,
  pexels: searchPexels,
  pixabay: searchPixabay,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.trim();
  const provider = searchParams.get('provider') as MediaProvider | null;

  if (!query) {
    return NextResponse.json({ error: 'A search query is required.' }, { status: 400 });
  }
  if (!provider || !(provider in SEARCH_FUNCTIONS)) {
    return NextResponse.json({ error: 'A valid provider (unsplash, pexels, or pixabay) is required.' }, { status: 400 });
  }

  try {
    const results = await SEARCH_FUNCTIONS[provider](query);
    return NextResponse.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Image search failed.';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
