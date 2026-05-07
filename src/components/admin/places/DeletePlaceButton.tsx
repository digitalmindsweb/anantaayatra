'use client';

import { deletePlaceAction } from '@/actions/places';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

export function DeletePlaceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm('Are you sure you want to delete this place?')) {
          startTransition(() => { deletePlaceAction(id); });
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 transition-colors"
      title="Delete place"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
