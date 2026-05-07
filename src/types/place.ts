export type PlaceStatus = 'draft' | 'published' | 'archived';

// Mirrors exact DB schema (name field, not title)
export interface Place {
  id: string;
  slug: string;
  name: string;             // DB column is 'name', not 'title'
  description: string | null;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  country: string | null;
  state: string | null;
  best_time_to_visit: string | null;
  highlights: string[] | null;
  tags: string[] | null;
  status: PlaceStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_by: string | null;
}

export type CreatePlaceInput = Omit<Place, 'id' | 'created_at'>;
export type UpdatePlaceInput = Partial<CreatePlaceInput> & { id: string };
