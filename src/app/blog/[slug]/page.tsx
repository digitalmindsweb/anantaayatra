import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTENT_DATA, BlogContent } from "@/data/content";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CONTENT_DATA
    .filter(item => item.type === 'blog') // optional filter
    .map(item => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const blogContentArray = CONTENT_DATA.filter(c => c.type === 'blog') as BlogContent[];
  const blog = blogContentArray.find((b) => b.slug === slug);

  if (!blog) {
    return {
      title: 'Blog Not Found | Anantaayatra',
    };
  }

  return {
    title: `${blog.title} | Anantaayatra`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
      images: [
        {
          url: blog.imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.imageUrl],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const blogContentArray = CONTENT_DATA.filter(c => c.type === 'blog') as BlogContent[];
  const currentIndex = blogContentArray.findIndex((b) => b.slug === slug);
  const blog = blogContentArray[currentIndex];
  
  const prevBlog = currentIndex < blogContentArray.length - 1 ? blogContentArray[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? blogContentArray[currentIndex - 1] : null;

  if (!blog) {
    redirect("/blog");
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-white dark:bg-slate-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div 
            className="w-full h-[400px] md:h-[600px] rounded-3xl bg-cover bg-center mb-16 shadow-2xl transition-transform duration-1000 hover:scale-[1.01]"
            style={{ backgroundImage: `url('${blog.imageUrl}')` }}
          />

          <div className="max-w-3xl mx-auto">
             <p className="text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-serif mb-10 italic border-l-4 border-brand-500 pl-6">
               "{blog.excerpt}"
             </p>
             <div 
                className="prose prose-brand prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200" 
                dangerouslySetInnerHTML={{ __html: blog.content }} 
             />
             <div className="text-lg leading-loose text-slate-800 dark:text-slate-200 mt-6">
                <p>As you venture forth, remember that the journey is just as important as the destination. Embrace the unexpected, connect with locals, and leave only footprints behind.</p>
             </div>
          </div>
          
          <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-10 mt-16 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-12">
              {prevBlog ? (
                <Link href={`/blog/${prevBlog.slug}`} className="group flex-1 flex flex-col w-full text-left bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl transition-colors border border-transparent dark:border-slate-700">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" /> Previous Article
                  </span>
                  <span className="font-serif font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{prevBlog.title}</span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block"></div>
              )}

              {nextBlog ? (
                <Link href={`/blog/${nextBlog.slug}`} className="group flex-1 flex flex-col w-full sm:text-right bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl transition-colors border border-transparent dark:border-slate-700 sm:items-end">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    Next Article <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-serif font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{nextBlog.title}</span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block"></div>
              )}
            </div>

            <div className="flex justify-center">
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center px-8 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold rounded-full transition-colors group"
              >
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
