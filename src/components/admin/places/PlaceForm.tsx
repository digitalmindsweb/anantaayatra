'use client';

import * as React from 'react';
import { Input } from '@/components/forms/Input';
import { Textarea } from '@/components/forms/Textarea';
import { Select } from '@/components/forms/Select';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { createPlaceAction, updatePlaceAction } from '@/actions/places';
import { Place } from '@/types/place';
import { slugify } from '@/lib/utils/slugify';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface PlaceFormProps {
  place?: Place;
}

export function PlaceForm({ place }: PlaceFormProps) {
  const [error, setError] = React.useState<string | null>(null);
  const [name, setName] = React.useState(place?.name ?? '');
  const [slug, setSlug] = React.useState(place?.slug ?? '');
  const isEdit = !!place;

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    if (!isEdit) setSlug(slugify(e.target.value));
  }

  async function action(formData: FormData) {
    setError(null);
    const res = isEdit
      ? await updatePlaceAction(place.id, null, formData)
      : await createPlaceAction(null, formData);
    if (res?.error) setError(res.error);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/admin/places" className="mr-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isEdit ? 'Edit Place' : 'Create New Place'}
        </h1>
      </div>

      <form action={action} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="md:col-span-2 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <Input
                name="name"
                required
                value={name}
                onChange={handleNameChange}
                placeholder="Darjeeling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug</label>
              <Input
                name="slug"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="darjeeling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Excerpt</label>
              <Textarea
                name="excerpt"
                defaultValue={place?.excerpt ?? ''}
                className="min-h-[80px]"
                placeholder="Short summary shown in listings"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description / Content</label>
              <Textarea
                name="content"
                defaultValue={place?.content ?? ''}
                className="min-h-[260px]"
                placeholder="Full description of this place..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Country</label>
                <Input name="country" defaultValue={place?.country ?? ''} placeholder="India" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">State / Region</label>
                <Input name="state" defaultValue={place?.state ?? ''} placeholder="West Bengal" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Best Time to Visit</label>
              <Input
                name="best_time_to_visit"
                defaultValue={place?.best_time_to_visit ?? ''}
                placeholder="October to March"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Status */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Publishing</h3>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
              <Select
                name="status"
                defaultValue={place?.status ?? 'draft'}
                options={[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Published', value: 'published' },
                  { label: 'Archived', value: 'archived' },
                ]}
              />
              <div className="mt-4 flex items-center">
                <input 
                  type="checkbox" 
                  name="is_featured" 
                  id="is_featured"
                  defaultChecked={place?.is_featured}
                  className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  Featured Place
                </label>
              </div>
            </div>

            {/* Media */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Media</h3>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Featured Image URL</label>
              <Input
                name="image_url"
                defaultValue={place?.image_url ?? ''}
                placeholder="https://..."
              />
              <p className="text-xs text-slate-400 mt-2">Future: Supabase Storage upload.</p>
            </div>

            {/* SEO */}
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">SEO</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Title</label>
                <Input name="meta_title" defaultValue={place?.meta_title ?? ''} placeholder="SEO title (max 60)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Description</label>
                <Textarea
                  name="meta_description"
                  defaultValue={place?.meta_description ?? ''}
                  className="min-h-[80px]"
                  placeholder="SEO description (max 160)"
                />
              </div>
            </div>

            <SubmitButton className="w-full">
              {isEdit ? 'Save Changes' : 'Create Place'}
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
