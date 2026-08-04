import { NextResponse } from 'next/server';
import { getMediaLibrary, saveMediaLibraryItem } from '@/lib/db/media';
import { mediaProviderConfig } from '@/lib/config/env';

export async function GET() {
  const items = await getMediaLibrary();
  return NextResponse.json({
    items,
    providers: mediaProviderConfig,
  });
}

export async function POST(request: Request) {
  let body: {
    url?: unknown;
    altText?: unknown;
    source?: unknown;
    sourceId?: unknown;
    attribution?: unknown;
    width?: unknown;
    height?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const url = typeof body.url === 'string' ? body.url.trim() : '';
  const source = typeof body.source === 'string' ? body.source : 'manual';

  if (!url) {
    return NextResponse.json({ error: 'An image URL is required.' }, { status: 400 });
  }
  if (!['unsplash', 'pexels', 'pixabay', 'upload', 'manual'].includes(source)) {
    return NextResponse.json({ error: 'Invalid source.' }, { status: 400 });
  }

  const item = await saveMediaLibraryItem({
    url,
    altText: typeof body.altText === 'string' ? body.altText : '',
    source: source as 'unsplash' | 'pexels' | 'pixabay' | 'upload' | 'manual',
    sourceId: typeof body.sourceId === 'string' ? body.sourceId : null,
    attribution: typeof body.attribution === 'string' ? body.attribution : null,
    width: typeof body.width === 'number' ? body.width : null,
    height: typeof body.height === 'number' ? body.height : null,
  });

  return NextResponse.json(item, { status: 201 });
}
