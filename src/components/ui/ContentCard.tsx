import Link from "next/link";
import { Clock, Calendar, MapPin } from "lucide-react";
import { AnyContent } from "@/data/content";

interface ContentCardProps {
  item: AnyContent;
  headingLevel?: 'h2' | 'h3';
}

export default function ContentCard({ item, headingLevel = 'h3' }: ContentCardProps) {
  const HeadingTag = headingLevel;

  const getBasePath = (type: string) => {
    switch (type) {
      case 'place': return '/places';
      case 'itinerary': return '/itinerary';
      case 'blog': return '/blog';
      default: return '/blog';
    }
  };

  const href = `${getBasePath(item.type)}/${item.slug}`;

  return (
    <article className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-2xl transform group-hover:-translate-y-2 transition-all duration-500 ring-1 ring-slate-900/5 hover:ring-brand-500/20 flex flex-col h-full">
      <Link href={href} className="block relative h-60 overflow-hidden shrink-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ backgroundImage: `url('${item.imageUrl}')` }}
        />
        <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
          <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-600 dark:text-brand-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            {item.category}
          </span>
          {item.type === 'itinerary' && (
            <span className="bg-brand-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {item.duration}
            </span>
          )}
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-4 space-x-4 flex-wrap gap-y-2">
          {item.location && (
            <span className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              <span className="line-clamp-1">{item.location}</span>
            </span>
          )}
          <span className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            {item.date}
          </span>
        </div>
        
        <Link href={href} className="block mb-3">
          <HeadingTag className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
            {item.title}
          </HeadingTag>
        </Link>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
          {item.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-semibold tracking-wider uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
