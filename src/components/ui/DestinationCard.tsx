import Link from "next/link";
import { MapPin, Star } from "lucide-react";

interface DestinationCardProps {
  id: string | number;
  title: string;
  location: string;
  imageUrl: string;
  rating: number;
  featured?: boolean;
}

export default function DestinationCard({ id, title, location, imageUrl, rating, featured }: DestinationCardProps) {
  return (
    <Link href={`/destinations/${id}`} className="group relative block rounded-3xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {featured && (
        <div className="absolute top-4 left-4 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-md">
          Featured
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-serif text-2xl font-bold mb-1 group-hover:text-brand-300 transition-colors">{title}</h3>
        <div className="flex items-center justify-between mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <p className="flex items-center text-sm text-slate-200">
            <MapPin className="h-4 w-4 mr-1 pb-0.5" />
            {location}
          </p>
          <div className="flex items-center bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
            <Star className="h-3 w-3 text-accent-500 fill-accent-500 mr-1" />
            <span className="text-xs font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="w-0 h-0.5 bg-brand-400 group-hover:w-full transition-all duration-500 delay-200"></div>
      </div>
    </Link>
  );
}
