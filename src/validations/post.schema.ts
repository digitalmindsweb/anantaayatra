import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  excerpt: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  image_url: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  category: z.string().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  meta_title: z.string().max(60, 'Meta title should be under 60 characters').optional().nullable(),
  meta_description: z.string().max(160, 'Meta description should be under 160 characters').optional().nullable(),
  is_featured: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
});

export type PostFormData = z.infer<typeof PostSchema>;
