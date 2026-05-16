-- Migration: Add is_featured to places and itineraries

-- Add is_featured to places table
ALTER TABLE places ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Add is_featured to itineraries table
ALTER TABLE itineraries ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Optional: Update any existing rows if they should be featured based on old logic, 
-- but default false is safe.
