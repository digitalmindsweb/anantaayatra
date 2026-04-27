import Link from "next/link";
import { Clock, Calendar } from "lucide-react";

interface BlogCardProps {
  id?: string | number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogCard({ slug, title, excerpt, imageUrl, date, readTime, category }: BlogCardProps) {
  return (
    <article className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500 ring-1 ring-slate-900/5 hover:ring-brand-500/20">
      <Link href={`/blog/${slug}`} className="block relative h-60 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-600 dark:text-brand-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {category}
          </span>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 space-x-4">
          <span className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {date}
          </span>
          <span className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            {readTime}
          </span>
        </div>
        
        <Link href={`/blog/${slug}`}>
          <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop" alt="Author" className="object-cover h-full w-full" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Elena Martinez</p>
            <p className="text-xs text-slate-500">Travel Editor</p>
          </div>
        </div>
      </div>
    </article>
  );
}
