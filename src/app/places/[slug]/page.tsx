import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTENT_DATA, PlaceContent } from "@/data/content";
import { MapPin, Sun, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from 'next';

interface PlaceProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CONTENT_DATA
    .filter(item => item.type === 'place')
    .map(item => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: PlaceProps): Promise<Metadata> {
  const { slug } = await params;
  const places = CONTENT_DATA.filter(c => c.type === 'place') as PlaceContent[];
  const place = places.find((b) => b.slug === slug);

  if (!place) {
    return { title: 'Place Not Found | Anantaayatra' };
  }

  return {
    title: `${place.title} | Anantaayatra`,
    description: place.excerpt,
    openGraph: {
      title: place.title,
      description: place.excerpt,
      type: 'article',
      publishedTime: place.date,
      images: [ { url: place.imageUrl, width: 1200, height: 630, alt: place.title } ],
    },
  };
}

export default async function PlacePage({ params }: PlaceProps) {
  const { slug } = await params;
  const places = CONTENT_DATA.filter(c => c.type === 'place') as PlaceContent[];
  const currentIndex = places.findIndex((p) => p.slug === slug);
  const place = places[currentIndex];
  
  const prevPlace = currentIndex < places.length - 1 ? places[currentIndex + 1] : null;
  const nextPlace = currentIndex > 0 ? places[currentIndex - 1] : null;

  if (!place) redirect("/places");

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-white dark:bg-slate-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm mb-6">
              {place.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight">
              {place.title}
            </h1>
            
            <div className="flex items-center justify-center flex-wrap gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <MapPin className="h-4 w-4 mr-2 text-brand-500" />
                {place.location}
              </span>
              <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <Sun className="h-4 w-4 mr-2 text-accent-500" />
                Best time: {place.bestTimeToVisit}
              </span>
            </div>
          </div>

          <div 
            className="w-full h-[400px] md:h-[600px] rounded-3xl bg-cover bg-center mb-16 shadow-2xl transition-transform duration-1000 hover:scale-[1.01]"
            style={{ backgroundImage: `url('${place.imageUrl}')` }}
          />

          <div className="max-w-3xl mx-auto">
             <p className="text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-serif mb-12 italic border-l-4 border-brand-500 pl-6">
               "{place.excerpt}"
             </p>
             
             {/* Highlights section */}
             <div className="mb-12 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl">
               <h2 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">Key Highlights</h2>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {place.highlights.map((highlight, idx) => (
                   <li key={idx} className="flex items-start">
                     <CheckCircle className="h-5 w-5 text-brand-500 mr-3 shrink-0 mt-0.5" />
                     <span className="text-slate-700 dark:text-slate-300">{highlight}</span>
                   </li>
                 ))}
               </ul>
             </div>

             <div 
                className="prose prose-brand prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200" 
                dangerouslySetInnerHTML={{ __html: place.content }} 
             />
          </div>
          
          {/* Navigation */}
          <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-10 mt-16 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-12">
              {prevPlace ? (
                <Link href={`/places/${prevPlace.slug}`} className="group flex-1 flex flex-col w-full text-left bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl transition-colors border border-transparent dark:border-slate-700">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" /> Previous Place
                  </span>
                  <span className="font-serif font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{prevPlace.title}</span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block"></div>
              )}
              {nextPlace ? (
                <Link href={`/places/${nextPlace.slug}`} className="group flex-1 flex flex-col w-full sm:text-right bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl transition-colors border border-transparent dark:border-slate-700 sm:items-end">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    Next Place <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-serif font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{nextPlace.title}</span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block"></div>
              )}
            </div>
            
            <div className="flex justify-center flex-wrap gap-4">
              <Link href="/places" className="inline-flex items-center justify-center px-8 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold rounded-full transition-colors">
                View all places
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
