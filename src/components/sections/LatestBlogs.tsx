import ContentCard from "../ui/ContentCard";
import Link from "next/link";

import { getPublishedBlogs, mapBlogToContent } from "@/lib/blogs";

export default async function LatestBlogs() {
  const blogs = await getPublishedBlogs();
  const latestBlogs = blogs.slice(0, 3).map(mapBlogToContent);

  return (
    <section className="py-32 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Travel Guides</h2>
          <h3 className="text-5xl md:text-6xl font-serif font-black text-slate-900 dark:text-white tracking-tight">Latest from the Blog</h3>
          <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-xl">
            Insider tips, detailed itineraries, and inspiring stories from our network of seasoned travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((blog) => (
            <ContentCard key={blog.id} item={blog} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-300 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-500 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 font-medium rounded-full transition-all hover:shadow-md"
          >
            Read All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
