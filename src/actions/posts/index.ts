'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { PostSchema } from '@/validations/post.schema';
import * as postService from '@/services/posts';
import { getUser } from '@/lib/auth/getUser';

export async function createPostAction(prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const rawData = Object.fromEntries(formData.entries());
    
    // Convert is_featured from string 'on' to boolean
    const dataToValidate = {
      ...rawData,
      is_featured: rawData.is_featured === 'on',
    };

    const validatedData = PostSchema.parse(dataToValidate);

    // Check slug uniqueness
    const slugExists = await postService.checkSlugExists(validatedData.slug);
    if (slugExists) {
      return { error: 'Slug already exists. Please choose a unique slug.' };
    }

    const postToCreate = {
      ...validatedData,
      created_by: user.id,
      published_at: validatedData.status === 'published' ? new Date().toISOString() : null,
      type: 'blog', // Default type since the table uses it
    };

    await postService.createPost(postToCreate as any);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return { error: error.errors[0].message };
    }
    return { error: error.message || 'Failed to create post' };
  }

  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function updatePostAction(id: string, prevState: any, formData: FormData) {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");

    const rawData = Object.fromEntries(formData.entries());
    
    const dataToValidate = {
      ...rawData,
      is_featured: rawData.is_featured === 'on',
    };

    const validatedData = PostSchema.parse(dataToValidate);

    // Check slug uniqueness
    const slugExists = await postService.checkSlugExists(validatedData.slug, id);
    if (slugExists) {
      return { error: 'Slug already exists. Please choose a unique slug.' };
    }

    const postToUpdate = {
      id,
      ...validatedData,
      published_at: validatedData.status === 'published' && !rawData.published_at ? new Date().toISOString() : rawData.published_at,
    };

    await postService.updatePost(postToUpdate as any);
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return { error: error.errors[0].message };
    }
    return { error: error.message || 'Failed to update post' };
  }

  revalidatePath('/admin/posts');
  redirect('/admin/posts');
}

export async function deletePostAction(id: string) {
  try {
    const user = await getUser();
    if (!user) throw new Error("Unauthorized");
    
    await postService.deletePost(id);
    revalidatePath('/admin/posts');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete post');
  }
}
