-- =============================================================
-- CONSOLIDATED PLACES TABLE MIGRATION
-- Run this in Supabase SQL Editor
-- Safe to re-run: all statements use IF NOT EXISTS / IF EXISTS
-- =============================================================

-- 1. Core columns present in original schema (already exist — listed for reference):
--    id, slug, name, description, image_url, country, state,
--    tags, created_at, content, best_time_to_visit, highlights

-- 2. Add admin/SEO columns required by Places CMS
ALTER TABLE places
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft',
  ADD COLUMN IF NOT EXISTS excerpt TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- 3. Add status constraint (only safe if column is newly added;
--    if status column already existed with other values, comment this out)
ALTER TABLE places
  DROP CONSTRAINT IF EXISTS places_status_check;

ALTER TABLE places
  ADD CONSTRAINT places_status_check
  CHECK (status IN ('draft', 'published', 'archived'));

-- 4. Performance indexes
CREATE INDEX IF NOT EXISTS places_slug_idx ON places (slug);
CREATE INDEX IF NOT EXISTS places_status_idx ON places (status);
CREATE INDEX IF NOT EXISTS places_created_by_idx ON places (created_by);

-- 5. RLS policies
--    Enable RLS if not already enabled
ALTER TABLE places ENABLE ROW LEVEL SECURITY;

--    Public SELECT: anyone can read published places (for public pages)
DROP POLICY IF EXISTS "places_public_select" ON places;
CREATE POLICY "places_public_select"
  ON places FOR SELECT
  USING (status = 'published');

--    Admin SELECT: authenticated users with admin role can read all
DROP POLICY IF EXISTS "places_admin_select" ON places;
CREATE POLICY "places_admin_select"
  ON places FOR SELECT
  USING (auth.uid() IS NOT NULL);

--    INSERT: only authenticated users inserting their own record
DROP POLICY IF EXISTS "places_insert" ON places;
CREATE POLICY "places_insert"
  ON places FOR INSERT
  WITH CHECK (auth.uid() = created_by);

--    UPDATE: only the creator can update
DROP POLICY IF EXISTS "places_update" ON places;
CREATE POLICY "places_update"
  ON places FOR UPDATE
  USING (auth.uid() = created_by);

--    DELETE: only the creator can delete
DROP POLICY IF EXISTS "places_delete" ON places;
CREATE POLICY "places_delete"
  ON places FOR DELETE
  USING (auth.uid() = created_by);
