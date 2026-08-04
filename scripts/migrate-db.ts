/**
 * Creates the database schema (articles + admin_users tables). Safe to run
 * more than once — every statement in schema.sql is idempotent.
 *
 * Usage:
 *   1. Provision a Postgres database (Vercel dashboard → Storage → Create
 *      Database → Postgres) and connect it to this project. Vercel injects
 *      POSTGRES_URL and related env vars automatically once linked.
 *   2. Pull those env vars locally: `vercel env pull .env.local`
 *      (or copy them manually into .env.local — see .env.example)
 *   3. Run: npm run db:migrate
 */
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { sql } from '@vercel/postgres';

async function main() {
  const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');

  // Split on blank-line-separated statements so each CREATE TABLE/INDEX
  // runs as its own query — @vercel/postgres doesn't support multi-statement
  // strings in a single call.
  const statements = schema
    .split(/;\s*(?:\n|$)/)
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0 && !statement.startsWith('--'));

  console.log(`Running ${statements.length} schema statement(s)...`);

  for (const statement of statements) {
    await sql.query(statement);
  }

  console.log('Database schema is up to date (articles, admin_users tables ready).');
}

main().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
