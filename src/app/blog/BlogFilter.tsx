'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ContentCard from "@/components/ui/ContentCard";
import { AnyContent, BlogContent, ContentType, ItineraryContent, PlaceContent } from "@/data/content";
import { Suspense, useEffect, useMemo, useState } from 'react';

// Safe type guard to validate ContentType without casting
const isValidType = (type: string | null): type is ContentType => {
  return type === 'place' || type === 'itinerary' || type === 'blog';
};

interface BlogFilterProps {
  blogs: BlogContent[];
  places: PlaceContent[];
  itineraries: ItineraryContent[];
}

function FilterContent({ blogs, places, itineraries }: BlogFilterProps) {
  const searchParams = useSearchParams();
  const [currentFilter, setCurrentFilter] = useState<ContentType>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');
  
  useEffect(() => {
    const typeParam = searchParams.get('type');
    const categoryParam = searchParams.get('category');
    const tagParam = searchParams.get('tag');

    setCurrentFilter(isValidType(typeParam) ? typeParam : 'all');
    setCategoryFilter(categoryParam || 'all');
    setTagFilter(tagParam || 'all');
  }, [searchParams]);

  const contentData = useMemo<AnyContent[]>(
    () => [...places, ...itineraries, ...blogs],
    [blogs, itineraries, places]
  );

  const filteredContent = useMemo(() => {
    return contentData.filter((content) => {
      const matchesType = currentFilter === 'all' || content.type === currentFilter;
      const matchesCategory =
        categoryFilter === 'all' ||
        content.category.toLowerCase() === categoryFilter.toLowerCase();
      const matchesTag =
        tagFilter === 'all' ||
        content.tags.some((tag) => tag.toLowerCase() === tagFilter.toLowerCase());

      return matchesType && matchesCategory && matchesTag;
    });
  }, [categoryFilter, contentData, currentFilter, tagFilter]);

  const tabs = [
    { label: 'All Content', value: 'all' },
    { label: 'Places to Visit', value: 'place' },
    { label: 'Itineraries', value: 'itinerary' },
    { label: 'Travel Blogs', value: 'blog' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-serif font-black text-slate-900 dark:text-white mb-6 tracking-tight">Travel Hub</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Explore our curated destinations, step-by-step itineraries, and inspiring travel stories.
        </p>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {tabs.map((tab) => {
          const isActive = currentFilter === tab.value;
          const href = tab.value === 'all' ? '/blog' : `/blog?type=${tab.value}`;
          return (
            <Link 
              key={tab.value}
              href={href}
              onClick={() => setCurrentFilter(tab.value as ContentType)}
              className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide transition-all ${
                isActive 
                  ? 'bg-brand-600 text-white shadow-lg scale-105' 
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContent.map((item) => (
          <ContentCard key={item.id} item={item} headingLevel="h2" />
        ))}
      </div>
      
      {filteredContent.length === 0 && (
         <div className="text-center text-slate-500 py-20 text-lg">
            No content found for this category.
         </div>
      )}
    </div>
  );
}

export default function BlogFilter({ blogs, places, itineraries }: BlogFilterProps) {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[50vh] flex items-center justify-center">
        <div className="text-xl text-slate-500 animate-pulse">Loading content...</div>
      </div>
    }>
      <FilterContent blogs={blogs} places={places} itineraries={itineraries} />
    </Suspense>
  );
}
