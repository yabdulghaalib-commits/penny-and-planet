import type { MediaSearchResult } from '@/lib/media/types';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  alt: string | null;
  src: { original: string; large: string; medium: string; small: string; tiny: string };
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
}

export async function searchPexels(query: string): Promise<MediaSearchResult[]> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) return [];

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=24`;
  const response = await fetch(url, {
    headers: { Authorization: apiKey },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Pexels search failed (${response.status})`);
  }

  const data: PexelsSearchResponse = await response.json();

  return data.photos.map((photo) => ({
    sourceId: String(photo.id),
    provider: 'pexels' as const,
    thumbUrl: photo.src.medium,
    fullUrl: photo.src.large,
    width: photo.width,
    height: photo.height,
    suggestedAlt: photo.alt ?? '',
    attribution: `Photo by ${photo.photographer} on Pexels`,
    sourceUrl: photo.url,
  }));
}
