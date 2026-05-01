import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContentCard from "@/components/ui/ContentCard";
import { CONTENT_DATA } from "@/data/content";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Travel Itineraries | Anantaayatra',
  description: 'Step-by-step travel plans crafted by experts to maximize your adventure.',
};

export default function ItineraryList() {
  const itineraries = CONTENT_DATA.filter(c => c.type === 'itinerary');

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16 border-b border-slate-200 dark:border-slate-800 pb-10">
            <h1 className="text-5xl md:text-6xl font-serif font-black text-slate-900 dark:text-white mb-6 tracking-tight">Curated Itineraries</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl font-light leading-relaxed">
              Remove the stress of planning with our day-by-day journey guides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itineraries.map((itinerary) => (
              <ContentCard key={itinerary.id} item={itinerary} headingLevel="h2" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
