import BlogCard from "../ui/BlogCard";
import Link from "next/link";

const DUMMY_BLOGS = [
  {
    id: 1,
    title: "10 Hidden Gems in Southeast Asia You Must Visit",
    excerpt: "Escape the tourist traps and discover untouched beaches, ancient ruins, and authentic culinary experiences across Southeast Asia.",
    imageUrl: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    category: "Adventure"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Sustainable Travel",
    excerpt: "Learn how to minimize your carbon footprint while maximizing your cultural exchange during your global adventures.",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    date: "Oct 08, 2026",
    readTime: "8 min read",
    category: "Eco Travel"
  },
  {
    id: 3,
    title: "A Week in the Swiss Alps: Itinerary",
    excerpt: "From breathtaking train rides to cozy chalets, here is how you can spend an unforgettable week in the Swiss mountains.",
    imageUrl: "https://images.unsplash.com/photo-1531366936337-778c64cddc2d?q=80&w=1968&auto=format&fit=crop",
    date: "Sep 28, 2026",
    readTime: "12 min read",
    category: "Itinerary"
  }
];

export default function LatestBlogs() {
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
          {DUMMY_BLOGS.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
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
