import type { MediaSearchResult } from '@/lib/media/types';

interface PixabayHit {
  id: number;
  pageURL: string;
  tags: string;
  webformatURL: string;
  largeImageURL: string;
  imageWidth: number;
  imageHeight: number;
  user: string;
}

interface PixabaySearchResponse {
  hits: PixabayHit[];
}

export async function searchPixabay(query: string): Promise<MediaSearchResult[]> {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) return [];

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&per_page=24&safesearch=true&image_type=photo`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Pixabay search failed (${response.status})`);
  }

  const data: PixabaySearchResponse = await response.json();

  return data.hits.map((hit) => ({
    sourceId: String(hit.id),
    provider: 'pixabay' as const,
    thumbUrl: hit.webformatURL,
    fullUrl: hit.largeImageURL,
    width: hit.imageWidth,
    height: hit.imageHeight,
    suggestedAlt: hit.tags,
    attribution: `Image by ${hit.user} on Pixabay`,
    sourceUrl: hit.pageURL,
  }));
}
