import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { saveMediaLibraryItem } from '@/lib/db/media';

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB — stays safely under Vercel's ~4.5MB serverless request body limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'Image upload is not set up yet. Add a Vercel Blob store and BLOB_READ_WRITE_TOKEN (see .env.example). In the meantime, paste an image URL instead.' },
      { status: 501 },
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file was uploaded.' }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Please upload a JPEG, PNG, WebP, or GIF image.' }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: 'Image is too large. Please keep it under 4MB (resize or compress it first if it came straight from a phone camera).' }, { status: 400 });
  }

  const altText = typeof formData.get('altText') === 'string' ? String(formData.get('altText')) : '';

  const blob = await put(`article-images/${Date.now()}-${file.name}`, file, {
    access: 'public',
    addRandomSuffix: true,
  });

  const item = await saveMediaLibraryItem({
    url: blob.url,
    altText,
    source: 'upload',
  });

  return NextResponse.json(item, { status: 201 });
}
