-- Minimal migration for itineraries admin panel
-- Run in Supabase SQL Editor

-- 1. SEO fields + created_by on itineraries
ALTER TABLE itineraries
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- 2. Indexes for admin listing performance
CREATE INDEX IF NOT EXISTS itineraries_slug_idx ON itineraries (slug);
CREATE INDEX IF NOT EXISTS itineraries_status_idx ON itineraries (status);
CREATE INDEX IF NOT EXISTS itinerary_days_itinerary_id_idx ON itinerary_days (itinerary_id);
CREATE INDEX IF NOT EXISTS itinerary_places_itinerary_id_idx ON itinerary_places (itinerary_id);
