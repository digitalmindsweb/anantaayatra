import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-slate-900/40 bg-gradient-to-b from-black/60 via-black/20 to-slate-900/90 backdrop-blur-[2px]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
          <MapPin className="h-4 w-4" />
          Discover the unseen
        </span>
        <h1 className="text-6xl md:text-8xl font-serif font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
          Your Gateway to the <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-100">
            World's Wonders
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto drop-shadow-lg font-light leading-relaxed">
          Join us on a journey to the most breathtaking destinations. Expert travel guides, tips, and untamed adventures await.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            href="/destinations" 
            className="group w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
          >
            Start Exploring
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="/blog" 
            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 flex items-center justify-center"
          >
            Read Travel Guides
          </Link>
        </div>
      </div>

      {/* Decorative Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C56.71,118.92,137.38,130.34,220.8,118.47,255.43,113.51,288.94,88.18,321.39,56.44Z" className="fill-slate-50 dark:fill-slate-950"></path>
        </svg>
      </div>
    </div>
  );
}
