import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import { Compass, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Compass className="h-8 w-8 text-brand-500" />
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Anantaayatra
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Discovering hidden gems and exploring the unexpected. Your ultimate guide to the world's most breathtaking destinations and untamed adventures.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="hover:text-brand-400 transition-colors">About Us</Link></li>
              <li><Link href="/destinations" className="hover:text-brand-400 transition-colors">Top Destinations</Link></li>
              <li><Link href="/blog" className="hover:text-brand-400 transition-colors">Travel Guides</Link></li>
              <li><Link href="/contact" className="hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/category/adventure" className="hover:text-brand-400 transition-colors">Adventure Travel</Link></li>
              <li><Link href="/category/luxury" className="hover:text-brand-400 transition-colors">Luxury Resorts</Link></li>
              <li><Link href="/category/budget" className="hover:text-brand-400 transition-colors">Budget Backpacking</Link></li>
              <li><Link href="/category/culture" className="hover:text-brand-400 transition-colors">Culture & History</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-brand-500 flex-shrink-0 mt-0.5" />
                <span>123 Explorer's Way, Wanderlust City, WL 10023</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-500 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-500 flex-shrink-0" />
                <span>hello@anantaayatra.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Anantaayatra. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
