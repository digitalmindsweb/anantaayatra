import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import PopularItineraries from "@/components/sections/PopularItineraries";
import LatestBlogs from "@/components/sections/LatestBlogs";


export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-20">
        <Hero />
        <FeaturedDestinations />
        <PopularItineraries />
        <LatestBlogs />
      </main>
      <Footer />
    </>
  );
}