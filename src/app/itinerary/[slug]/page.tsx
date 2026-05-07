import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getItineraryBySlug, getItineraries } from "@/lib/itineraries";
import { MapPin, Calendar, Clock, ArrowLeft, ArrowRight, Route } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from 'next';

interface ItineraryProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ItineraryProps): Promise<Metadata> {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);

  if (!itinerary) {
    return { title: 'Itinerary Not Found | Anantaayatra' };
  }

  return {
    title: `${itinerary.title} | Anantaayatra`,
    description: itinerary.description,
    openGraph: {
      title: itinerary.title,
      description: itinerary.description || "",
      type: 'article',
      images: itinerary.image_url ? [ { url: itinerary.image_url, width: 1200, height: 630, alt: itinerary.title } ] : [],
    },
  };
}

export default async function ItineraryPage({ params }: ItineraryProps) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);
  
  // Fetch all itineraries to get the previous and next links
  const allItineraries = await getItineraries();
  const currentIndex = allItineraries.findIndex((p) => p.slug === slug);
  const prevItinerary = currentIndex < allItineraries.length - 1 && currentIndex !== -1 ? allItineraries[currentIndex + 1] : null;
  const nextItinerary = currentIndex > 0 ? allItineraries[currentIndex - 1] : null;

  if (!itinerary) redirect("/itinerary");

  // Fallbacks for missing data
  const imageUrl = itinerary.image_url || 'https://images.unsplash.com/photo-1531366936337-778c64cddc2d?q=80&w=1968&auto=format&fit=crop';
  const duration = itinerary.days && itinerary.days.length > 0 ? `${itinerary.days.length} Days` : 'Multi-Day Trip';

  return (
    <>
      <Navbar />
      <main className="flex-1 w-full pt-32 pb-32 bg-white dark:bg-slate-900 min-h-screen">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-block bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-sm mb-6">
              Itinerary
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 dark:text-white leading-tight mb-8 tracking-tight">
              {itinerary.title}
            </h1>
            
            <div className="flex items-center justify-center flex-wrap gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
              <span className="flex items-center bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                <Clock className="h-4 w-4 mr-2 text-brand-500" />
                {duration}
              </span>
            </div>
          </div>

          <div 
            className="w-full h-[400px] md:h-[600px] rounded-3xl bg-cover bg-center mb-16 shadow-2xl transition-transform duration-1000 hover:scale-[1.01]"
            style={{ backgroundImage: `url('${imageUrl}')` }}
          />

          <div className="max-w-3xl mx-auto">
             {itinerary.description && (
               <p className="text-2xl leading-relaxed text-slate-700 dark:text-slate-300 font-serif mb-12 italic border-l-4 border-brand-500 pl-6">
                 "{itinerary.description}"
               </p>
             )}

             {/* Day Wise Plan / Timeline */}
             {itinerary.days && itinerary.days.length > 0 && (
               <div className="mb-12">
                 <div className="flex items-center mb-10">
                   <Route className="h-8 w-8 text-brand-500 mr-4" />
                   <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white">Day-by-Day Itinerary</h2>
                 </div>
                 
                 <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent">
                   {itinerary.days.map((dayPlan, index) => (
                     <div key={dayPlan.id || index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                       
                       <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-brand-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10 font-bold text-sm">
                         {dayPlan.day_number}
                       </div>
                       
                       <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-700/50">
                         <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">Day {dayPlan.day_number}: {dayPlan.title}</h3>
                         <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{dayPlan.description}</p>
                         
                         {dayPlan.places && dayPlan.places.length > 0 && (
                           <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                             <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Places to visit:</h4>
                             <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                               {dayPlan.places.map((place) => (
                                 <li key={place.id}>{place.name}</li>
                               ))}
                             </ul>
                           </div>
                         )}
                       </div>

                     </div>
                   ))}
                 </div>
               </div>
             )}
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