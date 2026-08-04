import { sql } from '@/lib/db/client';

export interface AdminUserRow {
  id: number;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export async function getAdminByEmail(email: string): Promise<AdminUserRow | null> {
  const result = await sql<AdminUserRow>`SELECT * FROM admin_users WHERE email = ${email.toLowerCase()} LIMIT 1`;
  return result.rows[0] ?? null;
}

export async function getAdminById(id: number): Promise<AdminUserRow | null> {
  const result = await sql<AdminUserRow>`SELECT * FROM admin_users WHERE id = ${id} LIMIT 1`;
  return result.rows[0] ?? null;
}

export async function adminUserCount(): Promise<number> {
  const result = await sql<{ count: string }>`SELECT COUNT(*)::text as count FROM admin_users`;
  return Number(result.rows[0]?.count ?? 0);
}

/** Used only by scripts/seed-admin.ts during setup — never called from a public route. */
export async function createAdminUser(email: string, passwordHash: string): Promise<AdminUserRow> {
  const result = await sql<AdminUserRow>`
    INSERT INTO admin_users (email, password_hash)
    VALUES (${email.toLowerCase()}, ${passwordHash})
    RETURNING *
  `;
  const row = result.rows[0];
  if (!row) throw new Error('Failed to create admin user: no row returned');
  return row;
}

export async function updateAdminPassword(id: number, passwordHash: string): Promise<void> {
  await sql`UPDATE admin_users SET password_hash = ${passwordHash}, updated_at = now() WHERE id = ${id}`;
}
