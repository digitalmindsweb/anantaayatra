import { getItineraries } from '@/services/itineraries';
import { ItinerariesList } from '@/components/admin/itineraries/ItinerariesList';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function AdminItinerariesPage() {
  const itineraries = await getItineraries();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Itineraries</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your travel itineraries and day plans</p>
        </div>
        <Link
          href="/admin/itineraries/new"
          className="inline-flex items-center px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <Plus className="h-4 w-4 mr-2" /> New Itinerary
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <ItinerariesList data={itineraries} />
      </div>
    </div>
  );
}
