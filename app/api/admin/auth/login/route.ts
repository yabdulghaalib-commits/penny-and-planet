import { NextResponse } from 'next/server';
import { getAdminByEmail } from '@/lib/auth/admin';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_COOKIE_OPTIONS } from '@/lib/auth/session';

export async function POST(request: Request) {
  let body: { email?: unknown; password?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  // Deliberately generic error message on both "no such admin" and "wrong
  // password" — never reveal which one it was, so this endpoint can't be
  // used to enumerate valid admin email addresses.
  const genericError = NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });

  const admin = await getAdminByEmail(email);
  if (!admin) return genericError;

  const isValid = await verifyPassword(password, admin.password_hash);
  if (!isValid) return genericError;

  const token = await createSessionToken({ sub: String(admin.id), email: admin.email });

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS);
  return response;
}
