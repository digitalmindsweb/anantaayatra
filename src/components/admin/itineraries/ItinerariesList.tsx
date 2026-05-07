'use client';

import { Itinerary } from '@/types/itinerary';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { DeleteItineraryButton } from './DeleteItineraryButton';

export function ItinerariesList({ data }: { data: Itinerary[] }) {
  const columns: ColumnDef<Itinerary>[] = [
    {
      header: 'Title',
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-xs text-slate-500">{row.slug}</p>
        </div>
      ),
    },
    {
      header: 'Location',
      cell: (row) => row.location ?? <span className="text-slate-400">—</span>,
    },
    {
      header: 'Duration',
      cell: (row) => row.duration ?? <span className="text-slate-400">—</span>,
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <Link href={`/admin/itineraries/${row.id}/edit`} className="text-brand-600 hover:text-brand-800 p-2 transition-colors">
            <Edit className="h-4 w-4" />
          </Link>
          <DeleteItineraryButton id={row.id} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No itineraries found. Create one to get started."
    />
  );
}
