import { sql } from '@vercel/postgres';

/**
 * `sql` is a tagged-template query function from @vercel/postgres. It reads
 * connection details automatically from the POSTGRES_URL / POSTGRES_* env
 * vars that Vercel injects once a Postgres database is created and linked
 * to this project (Vercel dashboard → Storage → Create Database → Postgres
 * → Connect to Project). No manual connection-string wiring needed beyond
 * that link step — see .env.example and the README for local development.
 *
 * Re-exported from here (rather than importing '@vercel/postgres' directly
 * all over the codebase) so there is one place to swap the driver later if
 * needed, without touching every call site.
 */
export { sql };
