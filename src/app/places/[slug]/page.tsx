import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPlaces, getPlaceBySlug } from "@/lib/places";
import { MapPin, Sun, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface PlaceProps {
  params: Promise<{ slug: string }>;
}

// ✅ Metadata (dynamic)
export async function generateMetadata({ params }: PlaceProps): Promise<Metadata> {
  const { slug } = await params;
  const place = await getPlaceBySlug(slug);

  if (!place) {
    return { title: "Place Not Found | Anantaayatra" };
  }

  return {
    title: `${place.title} | Anantaayatra`,
    description: place.excerpt,
    openGraph: {
      title: place.title,
      description: place.excerpt,
      images: [{ url: place.imageUrl }],
    },
  };
}

// ✅ Page
export default async function PlacePage({ params }: PlaceProps) {
  const { slug } = await params;

  const place = await getPlaceBySlug(slug);
  if (!place) redirect("/places");

  const places = await getPlaces();
  const currentIndex = places.findIndex((p) => p.slug === slug);

  const prevPlace = currentIndex < places.length - 1 ? places[currentIndex + 1] : null;
  const nextPlace = currentIndex > 0 ? places[currentIndex - 1] : null;

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-white dark:bg-slate-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mb-12 text-center">
            <span className="inline-block bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm mb-6">
              {place.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight">
              {place.title}
            </h1>

            <div className="flex items-center justify-center flex-wrap gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              {place.location && (
                <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <MapPin className="h-4 w-4 mr-2 text-brand-500" />
                  {place.location}
                </span>
              )}

              {place.bestTimeToVisit && (
                <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <Sun className="h-4 w-4 mr-2 text-accent-500" />
                  Best time: {place.bestTimeToVisit}
                </span>
              )}
            </div>
          </div>

          {/* IMAGE */}
          <div
            className="w-full h-[400px] md:h-[600px] rounded-3xl bg-cover bg-center mb-16 shadow-2xl"
            style={{ backgroundImage: `url('${place.imageUrl}')` }}
          />

          <div className="max-w-3xl mx-auto">
            <p className="text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-serif mb-12 italic border-l-4 border-brand-500 pl-6">
              "{place.excerpt}"
            </p>

            {/* Highlights (optional safe) */}
            {place.highlights && (
              <div className="mb-12 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl">
                <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">
                  Key Highlights
                </h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {place.highlights.map((highlight: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-brand-500 mr-3 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content */}
            {place.content && (
              <div
                className="prose prose-brand prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: place.content }}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="max-w-3xl mx-auto border-t pt-10 mt-16 pb-8">
            <div className="flex flex-col sm:flex-row justify-between gap-6 mb-12">

              {prevPlace ? (
                <Link href={`/places/${prevPlace.slug}`} className="flex-1 p-6 bg-slate-50 rounded-2xl">
                  ← {prevPlace.title}
                </Link>
              ) : <div className="flex-1"></div>}

              {nextPlace ? (
                <Link href={`/places/${nextPlace.slug}`} className="flex-1 p-6 text-right bg-slate-50 rounded-2xl">
                  {nextPlace.title} →
                </Link>
              ) : <div className="flex-1"></div>}

            </div>

            <div className="flex justify-center">
              <Link href="/places" className="px-8 py-3 bg-brand-50 rounded-full">
                View all places
              </Link>
            </div>
          </div>

        </article>
      </main>
      <Footer />
    </>
  );
}
