import { z } from 'zod';

export const PlaceSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  excerpt: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  image_url: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  country: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  best_time_to_visit: z.string().optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  meta_title: z.string().max(60).optional().nullable(),
  meta_description: z.string().max(160).optional().nullable(),
  is_featured: z.boolean().default(false),
});

export type PlaceFormData = z.infer<typeof PlaceSchema>;
