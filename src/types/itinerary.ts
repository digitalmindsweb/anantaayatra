// Mirrors the exact DB schema columns — no invented fields
export type ItineraryStatus = 'draft' | 'published' | 'archived';

export interface ItineraryPlace {
  id: string;
  itinerary_id: string;
  day_number: number;       // links to itinerary_days.day_number
  place_name: string | null;
  place_slug: string | null;
  description: string | null;
}

export interface ItineraryDay {
  id: string;
  itinerary_id: string;
  day_number: number;
  title: string;
  description: string | null;
}

export interface Itinerary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string | null;
  image_url: string | null;
  duration: string | null;
  tags: string[] | null;
  status: ItineraryStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category: string | null;
  location: string | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  created_by: string | null;
}

// Used in the admin form editor — days carry their places client-side
export interface ItineraryDayWithPlaces extends ItineraryDay {
  places: ItineraryPlace[];
}

export type CreateItineraryInput = Omit<Itinerary, 'id' | 'created_at' | 'updated_at'>;
export type UpdateItineraryInput = Partial<CreateItineraryInput> & { id: string };
