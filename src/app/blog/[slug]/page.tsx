import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DUMMY_BLOGS } from "@/data/blogs";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Metadata } from 'next';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = DUMMY_BLOGS.find((b) => b.slug === slug);

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
  const blog = DUMMY_BLOGS.find((b) => b.slug === slug);

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
             <div className="text-lg leading-loose text-slate-800 dark:text-slate-200">
                <p>{blog.content}</p>
                <p className="mt-6">As you venture forth, remember that the journey is just as important as the destination. Embrace the unexpected, connect with locals, and leave only footprints behind.</p>
             </div>
          </div>
          
          <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-10 mt-16 pb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold rounded-full transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Travel Journal
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
