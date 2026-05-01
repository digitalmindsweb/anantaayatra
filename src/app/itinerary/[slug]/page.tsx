import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CONTENT_DATA, ItineraryContent } from "@/data/content";
import { MapPin, Calendar, Clock, ArrowLeft, ArrowRight, Route } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from 'next';

interface ItineraryProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CONTENT_DATA
    .filter(item => item.type === 'itinerary')
    .map(item => ({
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: ItineraryProps): Promise<Metadata> {
  const { slug } = await params;
  const itineraries = CONTENT_DATA.filter(c => c.type === 'itinerary') as ItineraryContent[];
  const itinerary = itineraries.find((b) => b.slug === slug);

  if (!itinerary) {
    return { title: 'Itinerary Not Found | Anantaayatra' };
  }

  return {
    title: `${itinerary.title} | Anantaayatra`,
    description: itinerary.excerpt,
    openGraph: {
      title: itinerary.title,
      description: itinerary.excerpt,
      type: 'article',
      publishedTime: itinerary.date,
      images: [ { url: itinerary.imageUrl, width: 1200, height: 630, alt: itinerary.title } ],
    },
  };
}

export default async function ItineraryPage({ params }: ItineraryProps) {
  const { slug } = await params;
  const itineraries = CONTENT_DATA.filter(c => c.type === 'itinerary') as ItineraryContent[];
  const currentIndex = itineraries.findIndex((p) => p.slug === slug);
  const itinerary = itineraries[currentIndex];
  
  const prevItinerary = currentIndex < itineraries.length - 1 ? itineraries[currentIndex + 1] : null;
  const nextItinerary = currentIndex > 0 ? itineraries[currentIndex - 1] : null;

  if (!itinerary) redirect("/itinerary");

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-white dark:bg-slate-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm mb-6">
              {itinerary.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight">
              {itinerary.title}
            </h1>
            
            <div className="flex items-center justify-center flex-wrap gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4 mr-2 text-brand-500" />
                {itinerary.duration}
              </span>
              {itinerary.location && (
                <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                  <MapPin className="h-4 w-4 mr-2 text-brand-500" />
                  {itinerary.location}
                </span>
              )}
            </div>
          </div>

          <div 
            className="w-full h-[400px] md:h-[600px] rounded-3xl bg-cover bg-center mb-16 shadow-2xl transition-transform duration-1000 hover:scale-[1.01]"
            style={{ backgroundImage: `url('${itinerary.imageUrl}')` }}
          />

          <div className="max-w-3xl mx-auto">
             <p className="text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-serif mb-12 italic border-l-4 border-brand-500 pl-6">
               "{itinerary.excerpt}"
             </p>
             
             <div 
                className="prose prose-brand prose-lg dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 mb-16" 
                dangerouslySetInnerHTML={{ __html: itinerary.content }} 
             />

             {/* Day Wise Plan / Timeline */}
             <div className="mb-12">
               <div className="flex items-center mb-10">
                 <Route className="h-8 w-8 text-brand-500 mr-4" />
                 <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Day-by-Day Itinerary</h2>
               </div>
               
               <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                 {itinerary.dayWisePlan.map((dayPlan, index) => (
                   <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                     
                     <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-brand-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 font-bold text-sm">
                       {dayPlan.day}
                     </div>
                     
                     <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700/50">
                       <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Day {dayPlan.day}: {dayPlan.title}</h3>
                       <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{dayPlan.plan}</p>
                     </div>

                   </div>
                 ))}
               </div>
             </div>
          </div>
          
          {/* Navigation */}
          <div className="max-w-3xl mx-auto border-t border-slate-200 dark:border-slate-800 pt-10 mt-16 pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-stretch gap-6 mb-12">
              {prevItinerary ? (
                <Link href={`/itinerary/${prevItinerary.slug}`} className="group flex-1 flex flex-col w-full text-left bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl transition-colors border border-transparent dark:border-slate-700">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" /> Previous
                  </span>
                  <span className="font-serif font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{prevItinerary.title}</span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block"></div>
              )}
              {nextItinerary ? (
                <Link href={`/itinerary/${nextItinerary.slug}`} className="group flex-1 flex flex-col w-full sm:text-right bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800 p-6 rounded-2xl transition-colors border border-transparent dark:border-slate-700 sm:items-end">
                  <span className="text-sm text-brand-600 dark:text-brand-400 mb-2 font-semibold flex items-center">
                    Next <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="font-serif font-bold text-lg text-slate-900 dark:text-white line-clamp-2">{nextItinerary.title}</span>
                </Link>
              ) : (
                <div className="flex-1 hidden sm:block"></div>
              )}
            </div>
            
            <div className="flex justify-center flex-wrap gap-4">
              <Link href="/itinerary" className="inline-flex items-center justify-center px-8 py-3 bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 font-semibold rounded-full transition-colors">
                View all itineraries
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
