'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ItinerarySchema } from '@/validations/itinerary.schema';
import * as itineraryService from '@/services/itineraries';
import { getUser } from '@/lib/auth/getUser';
import { ItineraryDayWithPlaces } from '@/types/itinerary';

export async function createItineraryAction(prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    if (!user) throw new Error('Unauthorized');

    const rawData = Object.fromEntries(formData.entries());

    // Days are serialized as JSON by the client form
    const daysRaw = formData.get('days_json');
    const days: ItineraryDayWithPlaces[] = daysRaw ? JSON.parse(daysRaw as string) : [];

    const validatedData = ItinerarySchema.parse({ ...rawData, days });

    const slugExists = await itineraryService.checkItinerarySlugExists(validatedData.slug);
    if (slugExists) return { error: 'Slug already exists. Please choose a unique slug.' };

    const { days: validatedDays, ...itineraryFields } = validatedData;

    const itinerary = await itineraryService.createItinerary({
      ...itineraryFields,
      created_by: user.id,
      published_at: validatedData.status === 'published' ? new Date().toISOString() : null,
      tags: [],
    } as any);

    await itineraryService.replaceDaysAndPlaces(itinerary.id, validatedDays as ItineraryDayWithPlaces[]);
  } catch (error: any) {
    if (error.name === 'ZodError') return { error: error.errors[0].message };
    return { error: error.message || 'Failed to create itinerary' };
  }

  revalidatePath('/admin/itineraries');
  redirect('/admin/itineraries');
}

export async function updateItineraryAction(id: string, prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    if (!user) throw new Error('Unauthorized');

    const rawData = Object.fromEntries(formData.entries());
    const daysRaw = formData.get('days_json');
    const days: ItineraryDayWithPlaces[] = daysRaw ? JSON.parse(daysRaw as string) : [];

    const validatedData = ItinerarySchema.parse({ ...rawData, days });

    const slugExists = await itineraryService.checkItinerarySlugExists(validatedData.slug, id);
    if (slugExists) return { error: 'Slug already exists. Please choose a unique slug.' };

    const { days: validatedDays, ...itineraryFields } = validatedData;

    await itineraryService.updateItinerary({ id, ...itineraryFields } as any);
    await itineraryService.replaceDaysAndPlaces(id, validatedDays as ItineraryDayWithPlaces[]);
  } catch (error: any) {
    if (error.name === 'ZodError') return { error: error.errors[0].message };
    return { error: error.message || 'Failed to update itinerary' };
  }

  revalidatePath('/admin/itineraries');
  redirect('/admin/itineraries');
}

export async function deleteItineraryAction(id: string) {
  const user = await getUser();
  if (!user) throw new Error('Unauthorized');
  await itineraryService.deleteItinerary(id);
  revalidatePath('/admin/itineraries');
}
