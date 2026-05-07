import { createClient } from '@/lib/supabase/server';
import { Place, CreatePlaceInput, UpdatePlaceInput } from '@/types/place';

export async function getPlaces(): Promise<Place[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Place[];
}

export async function getPlaceById(id: string): Promise<Place | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(error.message);
  }
  return data as Place;
}

export async function checkPlaceSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from('places').select('id').eq('slug', slug);
  if (excludeId) query = query.neq('id', excludeId);
  const { data, error } = await query.limit(1);
  if (error) throw new Error(error.message);
  return data != null && data.length > 0;
}

export async function createPlace(input: CreatePlaceInput): Promise<Place> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('places')
    .insert([input])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Place;
}

export async function updatePlace(input: UpdatePlaceInput): Promise<Place> {
  const supabase = await createClient();
  const { id, ...updates } = input;
  const { data, error } = await supabase
    .from('places')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Place;
}

export async function deletePlace(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('places').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
