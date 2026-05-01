export type ContentType = 'all' | 'place' | 'itinerary' | 'blog';

export interface BaseContent {
  id: string | number;
  slug: string;
  type: ContentType;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  location?: string;
  author?: string; // Optional but heavily used for blogs
}

export interface PlaceContent extends BaseContent {
  type: 'place';
  location: string;
  bestTimeToVisit: string;
  highlights: string[];
}

export interface ItineraryContent extends BaseContent {
  type: 'itinerary';
  duration: string;
  dayWisePlan: { day: number; title: string; plan: string }[];
}

export interface BlogContent extends BaseContent {
  type: 'blog';
  author: string;
}

export type AnyContent = PlaceContent | ItineraryContent | BlogContent;

export const CONTENT_DATA: AnyContent[] = [
  // --- PLACES ---
  {
    id: 101,
    type: 'place',
    slug: 'kyoto-japan',
    title: 'Kyoto, Japan',
    excerpt: 'A city that perfectly balances ancient traditions with modern vibrancy.',
    content: "<p>Kyoto is the cultural heart of Japan. From the thousand vermilion gates of Fushimi Inari to the serene bamboo groves of Arashiyama, it offers a glimpse into Japan's storied past.</p><h2 class='text-3xl font-serif font-bold mt-12 mb-6'>Cultural Immersion</h2><p>Experience traditional tea ceremonies, witness authentic geisha culture in Gion, and marvel at over a thousand pristine temples scattered across the mountainous basin.</p>",
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    date: 'Jan 15, 2026',
    readTime: '6 min read',
    category: 'City Guide',
    tags: ['Asia', 'Culture', 'Temples'],
    location: 'Kyoto Prefecture, Japan',
    bestTimeToVisit: 'March to May (Cherry Blossoms) or October to November (Autumn Leaves)',
    highlights: ['Fushimi Inari Shrine', 'Kinkaku-ji (Golden Pavilion)', 'Arashiyama Bamboo Forest', 'Gion District'],
  },
  {
    id: 102,
    type: 'place',
    slug: 'amalfi-coast-italy',
    title: 'Amalfi Coast, Italy',
    excerpt: 'Dramatic cliffside villages overlooking the sparkling Tyrrhenian Sea.',
    content: "<p>The Amalfi Coast represents the pinnacle of Mediterranean beauty. With its steep cliffs, terraced vineyards, and pastel-colored towns plunging into the azure sea, it's a living postcard.</p><h2 class='text-3xl font-serif font-bold mt-12 mb-6'>La Dolce Vita</h2><p>Sip limoncello in Sorrento, sail past the Faraglioni rocks of Capri, and hike the famous Path of the Gods for unparalleled coastal panoramas.</p>",
    imageUrl: 'https://images.unsplash.com/photo-1549141151-c06346d9b0ca?q=80&w=1964&auto=format&fit=crop',
    date: 'Feb 10, 2026',
    readTime: '5 min read',
    category: 'Coastal',
    tags: ['Europe', 'Beaches', 'Luxury'],
    location: 'Campania, Italy',
    bestTimeToVisit: 'May or September to avoid the peak summer crowds',
    highlights: ['Positano', 'Ravello Gardens', 'Path of the Gods', 'Amalfi Cathedral'],
  },

  // --- ITINERARIES ---
  {
    id: 201,
    type: 'itinerary',
    slug: 'swiss-alps-7-days',
    title: 'A Week in the Swiss Alps: The Ultimate Itinerary',
    excerpt: 'From breathtaking train rides to cozy chalets, how to spend an unforgettable week in the Swiss mountains.',
    content: "<p>The Swiss Alps offer some of the most dramatic and picturesque landscapes in the world. Imagine waking up to the sight of snow-capped peaks and the sound of cowbells ringing in the distant meadows.</p><h2 class='text-3xl font-serif font-bold mt-12 mb-6'>Alpine Majesty</h2><p>Our 7-day itinerary takes you through the heart of Switzerland. You'll experience the world-famous Glacier Express, hike the Eiger Trail, and indulge in fondue in a traditional wooden chalet.</p>",
    imageUrl: 'https://images.unsplash.com/photo-1531366936337-778c64cddc2d?q=80&w=1968&auto=format&fit=crop',
    date: 'Sep 28, 2026',
    readTime: '12 min read',
    category: 'Mountains',
    tags: ['Europe', 'Adventure', 'Train Journeys'],
    location: 'Switzerland',
    duration: '7 Days / 6 Nights',
    dayWisePlan: [
      { day: 1, title: 'Arrival in Zurich & Transfer to Lucerne', plan: 'Arrive in Zurich, take a direct train to Lucerne. Enjoy an evening stroll across the Chapel Bridge.' },
      { day: 2, title: 'Mount Pilatus Excursion', plan: 'Take the steepest cogwheel railway in the world to the summit of Mt. Pilatus. Return via cable car.' },
      { day: 3, title: 'Interlaken & The Jungfrau Region', plan: 'Travel to Interlaken via the GoldenPass Express. Afternoon hike in Lauterbrunnen Valley.' },
      { day: 4, title: 'Top of Europe: Jungfraujoch', plan: 'Ride the train to the highest railway station in Europe. Walk through the Ice Palace and see the Aletsch Glacier.' },
      { day: 5, title: 'Glacier Express to Zermatt', plan: 'Board a panoramic train segment bound for the car-free village of Zermatt, home of the Matterhorn.' },
      { day: 6, title: 'Gornergrat & Matterhorn Views', plan: 'Take the Gornergrat Bahn for the best views of the Matterhorn. Enjoy a traditional Swiss fondue dinner.' },
      { day: 7, title: 'Departure', plan: 'Morning train to Zurich or Geneva airport for your onward journey.' },
    ]
  },
  {
    id: 202,
    type: 'itinerary',
    slug: 'golden-triangle-india',
    title: 'India\'s Golden Triangle: Delhi, Agra, Jaipur',
    excerpt: 'Explore the rich heritage, stunning forts, and the iconic Taj Mahal in this classic 5-day route.',
    content: "<p>The Golden Triangle is the perfect introduction to India's chaotic beauty, rich history, and stunning architectural marvels.</p><h2 class='text-3xl font-serif font-bold mt-12 mb-6'>A Royal Journey</h2><p>This concentrated route offers a taste of Mughal grandeur, Rajput forts, and vibrant bazaars bursting with colors and spices.</p>",
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    date: 'Nov 05, 2026',
    readTime: '9 min read',
    category: 'Heritage',
    tags: ['Asia', 'Culture', 'Architecture'],
    location: 'North India',
    duration: '5 Days / 4 Nights',
    dayWisePlan: [
      { day: 1, title: 'Delhi: Old & New', plan: 'Explore the narrow lanes of Chandni Chowk by rickshaw. Visit the Red Fort and India Gate.' },
      { day: 2, title: 'Journey to Agra', plan: 'Morning drive to Agra. Afternoon visit to the Agra Fort and sunset views of the Taj Mahal from Mehtab Bagh.' },
      { day: 3, title: 'The Taj Mahal & Transfer to Jaipur', plan: 'Sunrise visit to the iconic Taj Mahal. Drive to Jaipur with a stop at the abandoned city of Fatehpur Sikri.' },
      { day: 4, title: 'The Pink City', plan: 'Morning elephant/jeep ride to Amber Fort. Photo stop at Hawa Mahal and afternoon at the City Palace.' },
      { day: 5, title: 'Return to Delhi', plan: 'Last-minute shopping in Jaipur\'s Johari Bazaar. Afternoon drive back to Delhi for departure.' },
    ]
  },

  // --- BLOGS ---
  {
    id: 301,
    type: 'blog',
    slug: 'sustainable-travel-expert',
    title: 'The Ultimate Guide to Sustainable Travel',
    excerpt: 'Learn how to minimize your carbon footprint while maximizing your cultural exchange.',
    content: "<p>Sustainable travel is no longer a niche – it's a necessity. As global citizens, it's our responsibility to ensure the beautiful destinations we visit today remain pristine for future generations.</p><h2 class='text-3xl font-serif font-bold mt-12 mb-6'>Reducing Your Carbon Footprint</h2><p>This guide covers practical tips for reducing your environmental impact: from choosing eco-friendly accommodations and supporting local economies, to offsetting your carbon emissions.</p>",
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    date: 'Oct 08, 2026',
    readTime: '8 min read',
    category: 'Eco Travel',
    tags: ['Tips', 'Environment', 'Mindset'],
    author: 'Elena Martinez',
  },
  {
    id: 302,
    type: 'blog',
    slug: 'solo-travel-guide',
    title: 'Solo Travel: Finding Yourself in Foreign Lands',
    excerpt: 'Embarking on a solo journey is one of the most transformative experiences. What you need to know.',
    content: "<p>Solo travel is an incredible tool for personal growth. It forces you out of your comfort zone, encourages self-reliance, and opens you up to meeting new people in ways that traveling in a group simply cannot.</p><h2 class='text-3xl font-serif font-bold mt-12 mb-6'>Staying Safe and Sane</h2><p>This post delves into the psychological benefits of solo travel, shares safety tips for navigating unfamiliar cities alone, and offers advice on dealing with loneliness.</p>",
    imageUrl: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?q=80&w=1974&auto=format&fit=crop',
    date: 'Aug 30, 2026',
    readTime: '10 min read',
    category: 'Lifestyle',
    tags: ['Mindset', 'Inspiration', 'Safety'],
    author: 'James Wilson',
  }
];
