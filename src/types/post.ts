export type PostStatus = 'draft' | 'published' | 'archived';

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null; // featured_image
  category: string | null;
  tags: string[] | null;
  author: string | null;
  read_time: string | null;
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  place_id: string | null;
  read_time_int: number | null;
  category_id: string | null;
  
  // New fields added in Phase 2
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  created_by: string | null;
}

export type CreatePostInput = Omit<Post, 'id' | 'created_at' | 'updated_at'>;
export type UpdatePostInput = Partial<CreatePostInput> & { id: string };
