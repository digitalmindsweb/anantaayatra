import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getBlogBySlug, getPublishedBlogs, mapBlogToContent } from "@/lib/blogs";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  // 🔹 Get current blog
  const blogData = await getBlogBySlug(slug);
  if (!blogData) redirect("/blog");

  const blog = mapBlogToContent(blogData);

  // 🔹 Get all blogs for navigation
  const blogsRaw = await getPublishedBlogs();
  const blogs = blogsRaw.map(mapBlogToContent);

  const currentIndex = blogs.findIndex((b) => b.slug === slug);

  const prevBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full pt-32 pb-32 bg-white dark:bg-slate-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <div className="mb-12 text-center">
            <span className="inline-block bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm mb-6">
              {blog.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight">
              {blog.title}
            </h1>

            <div className="flex items-center justify-center text-sm font-medium text-slate-500 dark:text-slate-400 space-x-6">
              <span className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-brand-500" />
                {blog.date}
              </span>

              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-brand-500" />
                {blog.readTime}
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div
            className="w-full h-[400px] md:h-[600px] rounded-3xl bg-cover bg-center mb-16 shadow-2xl"
            style={{ backgroundImage: `url('${blog.imageUrl}')` }}
          />

          {/* CONTENT */}
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-serif mb-10 italic border-l-4 border-brand-500 pl-6">
              "{blog.excerpt}"
            </p>

            {blog.content && (
              <div
                className="prose prose-brand prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}
          </div>

          {/* NAVIGATION */}
          <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-10 mt-16 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-12">

              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} className="group flex-1 flex flex-col w-full text-left bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Previous Article
                  </span>
                  <span className="font-serif font-bold text-lg">{prevBlog.title}</span>
                </Link>
              ) : <div className="flex-1 hidden sm:block"></div>}

              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} className="group flex-1 flex flex-col w-full sm:text-right bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl sm:items-end">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    Next Article <ArrowRight className="h-4 w-4 ml-2" />
                  </span>
                  <span className="font-serif font-bold text-lg">{nextBlog.title}</span>
                </Link>
              ) : <div className="flex-1 hidden sm:block"></div>}

            </div>

            <div className="flex justify-center">
              <Link href="/blog" className="px-8 py-3 bg-brand-50 rounded-full">
                View all articles
              </Link>
            </div>
          </div>

        </article>
      </main>

      <Footer />
    </>
  );
}