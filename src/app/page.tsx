import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturedDestinations from "@/components/sections/FeaturedDestinations";
import LatestBlogs from "@/components/sections/LatestBlogs";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-20"> 
        <Hero />
        <FeaturedDestinations />
        <LatestBlogs />
      </main>
      <Footer />
    </>
  );
}
