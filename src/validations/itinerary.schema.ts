import { z } from 'zod';

export const ItineraryPlaceSchema = z.object({
  id: z.string().optional(),
  day_number: z.number(),
  place_name: z.string().min(1, 'Place name is required'),
  place_slug: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const ItineraryDaySchema = z.object({
  id: z.string().optional(),
  day_number: z.number(),
  title: z.string().min(1, 'Day title is required'),
  description: z.string().optional().nullable(),
  places: z.array(ItineraryPlaceSchema).default([]),
});

export const ItinerarySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  image_url: z.string().url('Must be a valid URL').optional().nullable().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  location: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  meta_title: z.string().max(60).optional().nullable(),
  meta_description: z.string().max(160).optional().nullable(),
  days: z.array(ItineraryDaySchema).default([]),
});

export type ItineraryFormData = z.infer<typeof ItinerarySchema>;
