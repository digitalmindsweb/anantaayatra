import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/ui/BlogCard";
import { DUMMY_BLOGS } from "@/data/blogs";

export default function BlogList() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-28 pb-32 bg-slate-50 dark:bg-slate-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 dark:text-white mb-6 tracking-tight">Travel Journal</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Tales, guides, and tips from our community of explorers travelling to the far reaches of the globe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DUMMY_BLOGS.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
