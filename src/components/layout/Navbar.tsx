"use client";

import Link from "next/link";
import { Compass, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <Compass className="h-8 w-8 text-brand-600 transition-transform group-hover:rotate-12" />
              <span className="font-serif text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Anantaayatra
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition-colors">
              Blog
            </Link>
            <Link href="/destinations" className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-500 font-medium transition-colors">
              Destinations
            </Link>
            <button className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
              Home
            </Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
              Blog
            </Link>
            <Link href="/destinations" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
              Destinations
            </Link>
            <button className="w-full mt-4 bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-full font-medium transition-all shadow-md">
              Subscribe
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
