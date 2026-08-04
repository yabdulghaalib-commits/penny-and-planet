import type { MediaSearchResult } from '@/lib/media/types';

interface UnsplashPhoto {
  id: string;
  description: string | null;
  alt_description: string | null;
  width: number;
  height: number;
  urls: { full: string; regular: string; small: string; thumb: string };
  user: { name: string; links: { html: string } };
  links: { html: string };
}

interface UnsplashSearchResponse {
  results: UnsplashPhoto[];
}

export async function searchUnsplash(query: string): Promise<MediaSearchResult[]> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return [];

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=24`;
  const response = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
    // Unsplash search results change; no need for Next's data cache here.
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unsplash search failed (${response.status})`);
  }

  const data: UnsplashSearchResponse = await response.json();

  return data.results.map((photo) => ({
    sourceId: photo.id,
    provider: 'unsplash' as const,
    thumbUrl: photo.urls.small,
    fullUrl: photo.urls.regular,
    width: photo.width,
    height: photo.height,
    suggestedAlt: photo.alt_description ?? photo.description ?? '',
    attribution: `Photo by ${photo.user.name} on Unsplash`,
    sourceUrl: photo.links.html,
  }));
}
