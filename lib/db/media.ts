import { sql } from '@/lib/db/client';

export interface MediaLibraryRow {
  id: number;
  url: string;
  alt_text: string;
  source: 'unsplash' | 'pexels' | 'pixabay' | 'upload' | 'manual';
  source_id: string | null;
  attribution: string | null;
  width: number | null;
  height: number | null;
  created_at: string;
}

export interface MediaLibraryInput {
  url: string;
  altText: string;
  source: MediaLibraryRow['source'];
  sourceId?: string | null;
  attribution?: string | null;
  width?: number | null;
  height?: number | null;
}

export async function getMediaLibrary(limit = 60): Promise<MediaLibraryRow[]> {
  const result = await sql<MediaLibraryRow>`
    SELECT * FROM media_library ORDER BY created_at DESC LIMIT ${limit}
  `;
  return result.rows;
}

/**
 * Avoids piling up duplicate rows if the same Unsplash/Pexels/Pixabay photo
 * gets selected more than once — de-duplicates by (source, source_id).
 * Uploads and manually-pasted URLs (no stable source_id) always insert a
 * new row.
 */
export async function saveMediaLibraryItem(input: MediaLibraryInput): Promise<MediaLibraryRow> {
  if (input.sourceId) {
    const existing = await sql<MediaLibraryRow>`
      SELECT * FROM media_library WHERE source = ${input.source} AND source_id = ${input.sourceId} LIMIT 1
    `;
    if (existing.rows[0]) return existing.rows[0];
  }

  const result = await sql<MediaLibraryRow>`
    INSERT INTO media_library (url, alt_text, source, source_id, attribution, width, height)
    VALUES (
      ${input.url}, ${input.altText}, ${input.source}, ${input.sourceId ?? null},
      ${input.attribution ?? null}, ${input.width ?? null}, ${input.height ?? null}
    )
    RETURNING *
  `;
  const row = result.rows[0];
  if (!row) throw new Error('Failed to save media library item: no row returned');
  return row;
}

export async function deleteMediaLibraryItem(id: number): Promise<void> {
  await sql`DELETE FROM media_library WHERE id = ${id}`;
}
