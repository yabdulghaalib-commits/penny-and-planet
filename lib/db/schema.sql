-- Penny and Planet — database schema
-- Run once via `npm run db:migrate` (see scripts/migrate-db.ts) against a
-- fresh Vercel Postgres database. Safe to re-run: every statement is
-- idempotent (CREATE TABLE IF NOT EXISTS / CREATE INDEX IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id                          SERIAL PRIMARY KEY,
  slug                        TEXT UNIQUE NOT NULL,
  title                       TEXT NOT NULL,
  meta_title                  TEXT,
  meta_description            TEXT,
  excerpt                     TEXT NOT NULL,
  featured_image_url          TEXT NOT NULL,
  featured_image_alt          TEXT NOT NULL,
  category                    TEXT NOT NULL,
  tags                        TEXT[] NOT NULL DEFAULT '{}',
  author_slug                 TEXT NOT NULL,
  content                     TEXT NOT NULL DEFAULT '',
  status                      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured                    BOOLEAN NOT NULL DEFAULT false,
  reading_time_minutes        INTEGER,
  published_at                TIMESTAMPTZ,
  updated_at                  TIMESTAMPTZ,
  publish_at                  TIMESTAMPTZ,
  canonical_url               TEXT,
  og_image_url                TEXT,
  downloadable_resource_slug  TEXT,
  faq_items                   JSONB,
  pinterest_title             TEXT,
  pinterest_description       TEXT,
  pinterest_image_url         TEXT,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS articles_status_idx ON articles (status);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles (category);
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles (published_at DESC);

-- Stage: rich editor + image management. Every image an admin selects
-- (from Unsplash/Pexels/Pixabay search, a manual upload, or a pasted URL)
-- is recorded here so it can be reused later from the "Library" tab of
-- the image picker instead of re-searching or re-uploading it.
CREATE TABLE IF NOT EXISTS media_library (
  id           SERIAL PRIMARY KEY,
  url          TEXT NOT NULL,
  alt_text     TEXT NOT NULL DEFAULT '',
  source       TEXT NOT NULL DEFAULT 'upload' CHECK (source IN ('unsplash', 'pexels', 'pixabay', 'upload', 'manual')),
  source_id    TEXT,
  attribution  TEXT,
  width        INTEGER,
  height       INTEGER,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS media_library_created_at_idx ON media_library (created_at DESC);
