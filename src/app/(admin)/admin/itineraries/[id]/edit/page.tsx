import { getItineraryById, getDaysWithPlaces } from '@/services/itineraries';
import { ItineraryForm } from '@/components/admin/itineraries/ItineraryForm';
import { notFound } from 'next/navigation';

export default async function EditItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [itinerary, initialDays] = await Promise.all([
    getItineraryById(id),
    getDaysWithPlaces(id),
  ]);

  if (!itinerary) notFound();

  return <ItineraryForm itinerary={itinerary} initialDays={initialDays} />;
}
