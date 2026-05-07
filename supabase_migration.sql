-- supabase_migration.sql
-- Please run this script in your Supabase SQL Editor

-- 1. Add new fields to posts table
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS meta_title TEXT,
ADD COLUMN IF NOT EXISTS meta_description TEXT,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- 2. Ensure excerpt exists (it was already in your table, but just in case)
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS excerpt TEXT;

-- 3. Enforce status constraint (optional if using text, but good for data integrity)
-- Drop existing constraint if you need to recreate it
-- ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_status_check;
ALTER TABLE posts
ADD CONSTRAINT posts_status_check CHECK (status IN ('draft', 'published', 'archived'));

-- 4. Create Indexes for performance
CREATE INDEX IF NOT EXISTS posts_slug_idx ON posts (slug);
CREATE INDEX IF NOT EXISTS posts_status_idx ON posts (status);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts (published_at);
