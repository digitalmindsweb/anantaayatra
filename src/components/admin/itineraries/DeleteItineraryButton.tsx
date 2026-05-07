'use client';

import { deleteItineraryAction } from '@/actions/itineraries';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export function DeleteItineraryButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm('Delete this itinerary and all its days/places?')) {
          startTransition(() => { deleteItineraryAction(id); });
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 transition-colors"
      title="Delete itinerary"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
