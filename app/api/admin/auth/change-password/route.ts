import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminById, updateAdminPassword } from '@/lib/auth/admin';
import { hashPassword, verifyPassword } from '@/lib/auth/password';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth/session';

export async function POST(request: Request) {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { currentPassword?: unknown; newPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const currentPassword = typeof body.currentPassword === 'string' ? body.currentPassword : '';
  const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Current and new password are both required.' }, { status: 400 });
  }
  if (newPassword.length < 10) {
    return NextResponse.json({ error: 'New password must be at least 10 characters.' }, { status: 400 });
  }

  const admin = await getAdminById(Number(session.sub));
  if (!admin) {
    return NextResponse.json({ error: 'Admin account not found.' }, { status: 404 });
  }

  const isCurrentValid = await verifyPassword(currentPassword, admin.password_hash);
  if (!isCurrentValid) {
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 });
  }

  const newHash = await hashPassword(newPassword);
  await updateAdminPassword(admin.id, newHash);

  return NextResponse.json({ success: true });
}
