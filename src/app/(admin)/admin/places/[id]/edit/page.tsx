import { getPlaceById } from '@/services/places';
import { PlaceForm } from '@/components/admin/places/PlaceForm';
import { notFound } from 'next/navigation';

export default async function EditPlacePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const place = await getPlaceById(id);

  if (!place) notFound();

  return <PlaceForm place={place} />;
}
