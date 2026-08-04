import { NextResponse, type NextRequest } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';

const PUBLIC_ADMIN_PATHS = ['/admin/login'];
const PUBLIC_ADMIN_API_PATHS = ['/api/admin/auth/login'];

/**
 * Runs on the Edge runtime for every request matching the config below.
 * This is the single gate for the entire admin area — every /admin page
 * and every /api/admin route (aside from the login page/endpoint
 * themselves) requires a valid session cookie or gets redirected/rejected.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPage = PUBLIC_ADMIN_PATHS.some((path) => pathname === path);
  const isPublicApi = PUBLIC_ADMIN_API_PATHS.some((path) => pathname === path);
  if (isPublicPage || isPublicApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  if (!session) {
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
