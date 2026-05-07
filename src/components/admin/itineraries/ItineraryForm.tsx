'use client';

import { useState, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/dnd/SortableItem';
import { Input } from '@/components/forms/Input';
import { Textarea } from '@/components/forms/Textarea';
import { SubmitButton } from '@/components/forms/SubmitButton';
import { Select } from '@/components/forms/Select';
import { createItineraryAction, updateItineraryAction } from '@/actions/itineraries';
import { Itinerary, ItineraryDayWithPlaces, ItineraryPlace } from '@/types/itinerary';
import { slugify } from '@/lib/utils/slugify';
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface ItineraryFormProps {
  itinerary?: Itinerary;
  initialDays?: ItineraryDayWithPlaces[];
}

type DayState = ItineraryDayWithPlaces & { _key: string };

function makeKey() {
  return Math.random().toString(36).slice(2);
}

function makeDay(dayNumber: number): DayState {
  return {
    _key: makeKey(),
    id: '',
    itinerary_id: '',
    day_number: dayNumber,
    title: '',
    description: null,
    places: [],
  };
}

function makePlaceEntry(): ItineraryPlace {
  return {
    id: '',
    itinerary_id: '',
    day_number: 0,
    place_name: '',
    place_slug: null,
    description: null,
  };
}

export function ItineraryForm({ itinerary, initialDays = [] }: ItineraryFormProps) {
  const isEdit = !!itinerary;
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(itinerary?.title ?? '');
  const [slug, setSlug] = useState(itinerary?.slug ?? '');
  const [days, setDays] = useState<DayState[]>(
    initialDays.length > 0
      ? initialDays.map((d) => ({ ...d, _key: d.id || makeKey() }))
      : []
  );
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ── Title → slug auto-generation ──────────────────────────────────────────
  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (!isEdit) setSlug(slugify(e.target.value));
  }

  // ── Days ──────────────────────────────────────────────────────────────────
  function addDay() {
    const newDay = makeDay(days.length + 1);
    setDays((prev) => [...prev, newDay]);
    setExpandedDay(newDay._key);
  }

  function removeDay(key: string) {
    setDays((prev) => prev.filter((d) => d._key !== key));
  }

  function updateDay(key: string, field: keyof DayState, value: any) {
    setDays((prev) => prev.map((d) => (d._key === key ? { ...d, [field]: value } : d)));
  }

  function handleDayDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setDays((prev) => {
        const oldIdx = prev.findIndex((d) => d._key === active.id);
        const newIdx = prev.findIndex((d) => d._key === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  }

  // ── Places inside a day ───────────────────────────────────────────────────
  function addPlace(dayKey: string) {
    setDays((prev) =>
      prev.map((d) =>
        d._key === dayKey ? { ...d, places: [...d.places, makePlaceEntry()] } : d
      )
    );
  }

  function removePlace(dayKey: string, placeIdx: number) {
    setDays((prev) =>
      prev.map((d) =>
        d._key === dayKey
          ? { ...d, places: d.places.filter((_, i) => i !== placeIdx) }
          : d
      )
    );
  }

  function updatePlace(dayKey: string, placeIdx: number, field: keyof ItineraryPlace, value: string) {
    setDays((prev) =>
      prev.map((d) =>
        d._key === dayKey
          ? {
              ...d,
              places: d.places.map((p, i) => (i === placeIdx ? { ...p, [field]: value } : p)),
            }
          : d
      )
    );
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(formData: FormData) {
    setError(null);
    // Serialize days state (with renumbered day_numbers) as JSON
    const serialized = days.map((d, idx) => ({
      ...d,
      day_number: idx + 1,
      places: d.places.map((p, pIdx) => ({ ...p, day_number: idx + 1 })),
    }));
    formData.set('days_json', JSON.stringify(serialized));

    const res = isEdit
      ? await updateItineraryAction(itinerary!.id, null, formData)
      : await createItineraryAction(null, formData);

    if (res?.error) setError(res.error);
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Link href="/admin/itineraries" className="mr-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isEdit ? 'Edit Itinerary' : 'Create New Itinerary'}
        </h1>
      </div>

      <form ref={formRef} action={handleSubmit}>
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main column ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* Core fields */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
              <h2 className="font-semibold text-slate-900 dark:text-white">Basic Info</h2>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <Input name="title" required value={title} onChange={handleTitleChange} placeholder="Darjeeling 4 Days Trip" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Slug</label>
                <Input name="slug" required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="darjeeling-4-days-trip" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <Textarea name="description" defaultValue={itinerary?.description ?? ''} className="min-h-[100px]" placeholder="Short description shown in listings" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <Input name="location" defaultValue={itinerary?.location ?? ''} placeholder="Darjeeling, India" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Duration</label>
                  <Input name="duration" defaultValue={itinerary?.duration ?? ''} placeholder="4 Days / 3 Nights" />
                </div>
              </div>
            </div>

            {/* ── Day editor ── */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-900 dark:text-white">Day-by-Day Itinerary</h2>
                <button
                  type="button"
                  onClick={addDay}
                  className="inline-flex items-center px-3 py-1.5 text-sm bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Day
                </button>
              </div>

              {days.length === 0 ? (
                <p className="text-center text-slate-400 py-10 text-sm">No days added yet. Click "Add Day" to start building the itinerary.</p>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDayDragEnd}>
                  <SortableContext items={days.map((d) => d._key)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                      {days.map((day, idx) => (
                        <SortableItem key={day._key} id={day._key} className="pl-8">
                          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                            {/* Day header */}
                            <div className="flex items-center bg-slate-50 dark:bg-slate-800/60 px-4 py-3">
                              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold mr-3 shrink-0">
                                {idx + 1}
                              </span>
                              <input
                                className="flex-1 bg-transparent text-sm font-medium text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
                                value={day.title}
                                onChange={(e) => updateDay(day._key, 'title', e.target.value)}
                                placeholder={`Day ${idx + 1} title`}
                              />
                              <button
                                type="button"
                                onClick={() => setExpandedDay(expandedDay === day._key ? null : day._key)}
                                className="ml-2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                              >
                                {expandedDay === day._key ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeDay(day._key)}
                                className="ml-1 p-1 text-red-400 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Day body */}
                            {expandedDay === day._key && (
                              <div className="p-4 space-y-4">
                                <textarea
                                  className="w-full text-sm border border-slate-200 dark:border-slate-700 rounded-md px-3 py-2 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 min-h-[80px] placeholder:text-slate-400"
                                  value={day.description ?? ''}
                                  onChange={(e) => updateDay(day._key, 'description', e.target.value)}
                                  placeholder="Describe what happens on this day..."
                                />

                                {/* Places */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Places to Visit</span>
                                    <button
                                      type="button"
                                      onClick={() => addPlace(day._key)}
                                      className="inline-flex items-center text-xs text-brand-600 hover:text-brand-800"
                                    >
                                      <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add Place
                                    </button>
                                  </div>

                                  {day.places.length === 0 ? (
                                    <p className="text-xs text-slate-400 py-2">No places added for this day.</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {day.places.map((place, pIdx) => (
                                        <div key={pIdx} className="flex items-center gap-2">
                                          <input
                                            className="flex-1 text-sm border border-slate-200 dark:border-slate-700 rounded px-2 py-1.5 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder:text-slate-400"
                                            value={place.place_name ?? ''}
                                            onChange={(e) => updatePlace(day._key, pIdx, 'place_name', e.target.value)}
                                            placeholder="Place name"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => removePlace(day._key, pIdx)}
                                            className="p-1 text-red-400 hover:text-red-600 shrink-0"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </SortableItem>
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>

          {/* ── Sidebar column ── */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Publishing</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Status</label>
                <Select
                  name="status"
                  defaultValue={itinerary?.status ?? 'draft'}
                  options={[
                    { label: 'Draft', value: 'draft' },
                    { label: 'Published', value: 'published' },
                    { label: 'Archived', value: 'archived' },
                  ]}
                />
              </div>
            </div>

            {/* Media */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Media</h3>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Featured Image URL</label>
              <Input name="image_url" defaultValue={itinerary?.image_url ?? ''} placeholder="https://..." />
              <p className="text-xs text-slate-400 mt-2">Future: Supabase Storage upload.</p>
            </div>

            {/* SEO */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">SEO</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Title</label>
                <Input name="meta_title" defaultValue={itinerary?.meta_title ?? ''} placeholder="SEO title (max 60)" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Meta Description</label>
                <Textarea name="meta_description" defaultValue={itinerary?.meta_description ?? ''} className="min-h-[80px]" placeholder="SEO description (max 160)" />
              </div>
            </div>

            <SubmitButton className="w-full">
              {isEdit ? 'Save Changes' : 'Create Itinerary'}
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
