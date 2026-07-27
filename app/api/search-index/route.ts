import { NextResponse } from 'next/server';
import { buildSearchIndex } from '@/lib/services/search';

export const revalidate = 3600; // regenerate hourly

export function GET() {
  return NextResponse.json(buildSearchIndex());
}
