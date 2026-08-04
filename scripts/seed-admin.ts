/**
 * Creates the admin account from ADMIN_EMAIL / ADMIN_PASSWORD env vars, or
 * resets that account's password if it already exists. This is also the
 * "forgot password" recovery path: change ADMIN_PASSWORD in your env vars
 * and re-run this script.
 *
 * Usage:
 *   1. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env.local (see .env.example)
 *   2. Run: npm run db:seed-admin
 *   3. Remove ADMIN_PASSWORD from .env.local afterwards if you like — it's
 *      only read by this script, never by the running application.
 */
import 'dotenv/config';
import { sql } from '@vercel/postgres';
import { hashPassword } from '../lib/auth/password';

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must both be set (in .env.local or your shell environment).');
    process.exit(1);
  }
  if (password.length < 10) {
    console.error('ADMIN_PASSWORD must be at least 10 characters.');
    process.exit(1);
  }

  const passwordHash = await hashPassword(password);

  const existing = await sql`SELECT id FROM admin_users WHERE email = ${email} LIMIT 1`;

  if (existing.rows.length > 0) {
    await sql`UPDATE admin_users SET password_hash = ${passwordHash}, updated_at = now() WHERE email = ${email}`;
    console.log(`Updated password for existing admin: ${email}`);
  } else {
    await sql`INSERT INTO admin_users (email, password_hash) VALUES (${email}, ${passwordHash})`;
    console.log(`Created admin user: ${email}`);
  }

  console.log('Done. You can now log in at /admin/login.');
}

main().catch((error) => {
  console.error('Seeding admin user failed:', error);
  process.exit(1);
});
