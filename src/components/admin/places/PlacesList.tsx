'use client';

import { Place } from '@/types/place';
import { DataTable, ColumnDef } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import { DeletePlaceButton } from './DeletePlaceButton';

export function PlacesList({ data }: { data: Place[] }) {
  const columns: ColumnDef<Place>[] = [
    {
      header: 'Name',
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-slate-500">{row.slug}</p>
        </div>
      ),
    },
    {
      header: 'Location',
      cell: (row) => {
        const parts = [row.state, row.country].filter(Boolean).join(', ');
        return parts || <span className="text-slate-400">—</span>;
      },
    },
    {
      header: 'Status',
      cell: (row) => <StatusBadge status={row.status ?? 'draft'} />,
    },
    {
      header: 'Actions',
      cell: (row) => (
        <div className="flex items-center space-x-1">
          <Link href={`/admin/places/${row.id}/edit`} className="text-brand-600 hover:text-brand-800 p-2 transition-colors">
            <Edit className="h-4 w-4" />
          </Link>
          <DeletePlaceButton id={row.id} />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      emptyMessage="No places found. Create one to get started."
    />
  );
}
