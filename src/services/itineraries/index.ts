import { createClient } from '@/lib/supabase/server';
import {
  Itinerary,
  ItineraryDay,
  ItineraryPlace,
  ItineraryDayWithPlaces,
  CreateItineraryInput,
  UpdateItineraryInput,
} from '@/types/itinerary';

// ── Itineraries ──────────────────────────────────────────────────────────────

export async function getItineraries(): Promise<Itinerary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Itinerary[];
}

export async function getItineraryById(id: string): Promise<Itinerary | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }
  return data as Itinerary;
}

export async function checkItinerarySlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from('itineraries').select('id').eq('slug', slug);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query.limit(1);
  if (error) throw new Error(error.message);
  return data != null && data.length > 0;
}

export async function createItinerary(input: CreateItineraryInput): Promise<Itinerary> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('itineraries')
    .insert([input])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Itinerary;
}

export async function updateItinerary(input: UpdateItineraryInput): Promise<Itinerary> {
  const supabase = await createClient();
  const { id, ...updates } = input;
  const { data, error } = await supabase
    .from('itineraries')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Itinerary;
}

export async function deleteItinerary(id: string): Promise<void> {
  const supabase = await createClient();
  // Days and places are deleted first to avoid FK issues if constraints exist
  await supabase.from('itinerary_places').delete().eq('itinerary_id', id);
  await supabase.from('itinerary_days').delete().eq('itinerary_id', id);
  const { error } = await supabase.from('itineraries').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ── Days ──────────────────────────────────────────────────────────────────────

export async function getDaysWithPlaces(itineraryId: string): Promise<ItineraryDayWithPlaces[]> {
  const supabase = await createClient();

  const [{ data: days, error: daysErr }, { data: places, error: placesErr }] = await Promise.all([
    supabase
      .from('itinerary_days')
      .select('*')
      .eq('itinerary_id', itineraryId)
      .order('day_number', { ascending: true }),
    supabase
      .from('itinerary_places')
      .select('*')
      .eq('itinerary_id', itineraryId),
  ]);

  if (daysErr) throw new Error(daysErr.message);

  return (days ?? []).map((day: ItineraryDay) => ({
    ...day,
    places: (places ?? []).filter((p: ItineraryPlace) => p.day_number === day.day_number),
  }));
}

/**
 * Atomic replace: delete all existing days/places for this itinerary,
 * then re-insert from the editor state. Uses day_number as ordering.
 */
export async function replaceDaysAndPlaces(
  itineraryId: string,
  days: ItineraryDayWithPlaces[]
): Promise<void> {
  const supabase = await createClient();

  // Delete existing
  await supabase.from('itinerary_places').delete().eq('itinerary_id', itineraryId);
  await supabase.from('itinerary_days').delete().eq('itinerary_id', itineraryId);

  if (days.length === 0) return;

  // Insert days
  const daysToInsert = days.map((d, idx) => ({
    itinerary_id: itineraryId,
    day_number: idx + 1,
    title: d.title,
    description: d.description ?? null,
  }));

  const { error: daysInsertErr } = await supabase.from('itinerary_days').insert(daysToInsert);
  if (daysInsertErr) throw new Error(daysInsertErr.message);

  // Insert places flat — using the new day_number index from above
  const placesToInsert = days.flatMap((d, idx) =>
    (d.places ?? []).map((p) => ({
      itinerary_id: itineraryId,
      day_number: idx + 1,
      place_name: p.place_name,
      place_slug: p.place_slug ?? null,
      description: p.description ?? null,
    }))
  );

  if (placesToInsert.length > 0) {
    const { error: placesInsertErr } = await supabase.from('itinerary_places').insert(placesToInsert);
    if (placesInsertErr) throw new Error(placesInsertErr.message);
  }
}
