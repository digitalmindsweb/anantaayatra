import DestinationCard from "../ui/DestinationCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const DUMMY_DESTINATIONS = [
  {
    id: 1,
    title: "Kyoto Highlights",
    location: "Kyoto, Japan",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
    featured: true
  },
  {
    id: 2,
    title: "Amalfi Coast",
    location: "Campania, Italy",
    imageUrl: "https://images.unsplash.com/photo-1549141151-c06346d9b0ca?q=80&w=1964&auto=format&fit=crop",
    rating: 4.8,
    featured: false
  },
  {
    id: 3,
    title: "Banff National Park",
    location: "Alberta, Canada",
    imageUrl: "https://images.unsplash.com/photo-1553681498-f2b7f03eb98d?q=80&w=1964&auto=format&fit=crop",
    rating: 4.9,
    featured: true
  }
];

export default function FeaturedDestinations() {
  return (
    <section className="py-32 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Trending Now</h2>
            <h3 className="text-5xl md:text-6xl font-serif font-black text-slate-900 dark:text-white tracking-tight">Featured Destinations</h3>
            <p className="mt-6 text-slate-600 dark:text-slate-400 text-xl">
              Handpicked locations that offer the perfect blend of adventure, culture, and relaxation.
            </p>
          </div>
          <Link href="/destinations" className="hidden md:flex items-center text-brand-600 hover:text-brand-700 dark:text-brand-500 dark:hover:text-brand-400 font-semibold group mt-6 md:mt-0">
            View all destinations
            <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.id} {...dest} />
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <Link href="/destinations" className="flex items-center justify-center w-full bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white py-3 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-brand-500">
            View all destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
