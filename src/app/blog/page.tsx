import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from 'next';
import BlogFilter from "./BlogFilter";

export const metadata: Metadata = {
  title: 'Travel Discover Hub | Anantaayatra',
  description: 'Explore curated places, in-depth itineraries, and personal travel stories.',
};

export default function BlogList() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-28 pb-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <BlogFilter />
      </main>
      <Footer />
    </>
  );
}
