import ContentCard from "../ui/ContentCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTENT_DATA, PlaceContent } from "@/data/content";

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
          {CONTENT_DATA.filter(c => c.type === 'place').slice(0, 3).map((dest) => (
            <ContentCard key={dest.id} item={dest} headingLevel="h3" />
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
