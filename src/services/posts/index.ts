import { createClient } from '@/lib/supabase/server';
import { Post, CreatePostInput, UpdatePostInput } from '@/types/post';

export async function getPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Post[];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw new Error(error.message);
  }
  return data as Post;
}

export async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();
  let query = supabase.from('posts').select('id').eq('slug', slug);
  if (excludeId) {
    query = query.neq('id', excludeId);
  }
  const { data, error } = await query.limit(1);
  if (error) throw new Error(error.message);
  return data && data.length > 0;
}

export async function createPost(post: CreatePostInput): Promise<Post> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
}

export async function updatePost(post: UpdatePostInput): Promise<Post> {
  const supabase = await createClient();
  const { id, ...updates } = post;
  
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
}
