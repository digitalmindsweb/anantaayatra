import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentCard from "@/components/ui/ContentCard";
import { getPlaces } from "@/lib/places";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Destinations & Places | Anantaayatra",
  description: "Explore our comprehensive guides to the most beautiful places on Earth.",
};

export const revalidate = 60;

export default async function PlacesList() {
  const places = await getPlaces(); // ✅ from DB

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16 border-b border-slate-200 dark:border-slate-800 pb-10">
            <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-900 dark:text-white mb-6 tracking-tight">
              Places to Visit
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl font-light leading-relaxed">
              Discover hidden gems, iconic cities, and serene landscapes curated by our experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {places.map((place) => (
              <ContentCard key={place.id} item={place} headingLevel="h2" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}