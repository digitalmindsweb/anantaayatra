'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PlaceSchema } from '@/validations/place.schema';
import * as placeService from '@/services/places';
import { getUser } from '@/lib/auth/getUser';

export async function createPlaceAction(prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    if (!user) throw new Error('Unauthorized');

    const rawData = Object.fromEntries(formData.entries());
    const validatedData = PlaceSchema.parse(rawData);

    const slugExists = await placeService.checkPlaceSlugExists(validatedData.slug);
    if (slugExists) return { error: 'Slug already exists. Please choose a unique slug.' };

    await placeService.createPlace({
      ...validatedData,
      created_by: user.id,
      published_at: validatedData.status === 'published' ? new Date().toISOString() : null,
      highlights: [],
      tags: [],
    } as any);
  } catch (error: any) {
    if (error.name === 'ZodError') return { error: error.errors[0].message };
    return { error: error.message || 'Failed to create place' };
  }

  revalidatePath('/');
  revalidatePath('/places');
  revalidatePath('/admin/places');
  redirect('/admin/places');
}

export async function updatePlaceAction(id: string, prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    if (!user) throw new Error('Unauthorized');

    const rawData = Object.fromEntries(formData.entries());
    const validatedData = PlaceSchema.parse(rawData);

    const slugExists = await placeService.checkPlaceSlugExists(validatedData.slug, id);
    if (slugExists) return { error: 'Slug already exists. Please choose a unique slug.' };

    await placeService.updatePlace({
      id,
      ...validatedData,
      published_at:
        validatedData.status === 'published' && !rawData.published_at
          ? new Date().toISOString()
          : (rawData.published_at as string) || null,
    } as any);
  } catch (error: any) {
    if (error.name === 'ZodError') return { error: error.errors[0].message };
    return { error: error.message || 'Failed to update place' };
  }

  revalidatePath('/');
  revalidatePath('/places');
  revalidatePath('/admin/places');
  redirect('/admin/places');
}

export async function deletePlaceAction(id: string) {
  const user = await getUser();
  if (!user) throw new Error('Unauthorized');
  await placeService.deletePlace(id);
  revalidatePath('/');
  revalidatePath('/places');
  revalidatePath('/admin/places');
}
