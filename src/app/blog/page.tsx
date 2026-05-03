import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Metadata } from 'next';
import BlogFilter from "./BlogFilter";
import { getPublishedBlogs, mapBlogToContent } from "@/lib/blogs";
import { getItineraries, mapItineraryToContent } from "@/lib/itineraries";
import { getPlaces } from "@/lib/places";

export const metadata: Metadata = {
  title: 'Travel Discover Hub | Anantaayatra',
  description: 'Explore curated places, in-depth itineraries, and personal travel stories.',
};

export const revalidate = 60;

export default async function BlogList() {
  const [blogs, places, itineraries] = await Promise.all([
    getPublishedBlogs(),
    getPlaces(),
    getItineraries(),
  ]);
  const blogContent = blogs.map(mapBlogToContent);
  const itineraryContent = itineraries.map(mapItineraryToContent);

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-28 pb-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <BlogFilter blogs={blogContent} places={places} itineraries={itineraryContent} />
      </main>
      <Footer />
    </>
  );
}
