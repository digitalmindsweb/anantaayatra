import { MetadataRoute } from "next";
import { getPlaces } from "@/lib/places";
import { getItineraries } from "@/lib/itineraries";
import { getPublishedBlogs } from "@/lib/blogs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anantaayatra.com";

  // 1. Fetch all dynamic data concurrently
  const [places, itineraries, blogs] = await Promise.all([
    getPlaces(),
    getItineraries(),
    getPublishedBlogs(),
  ]);

  // 2. Generate dynamic routes arrays
  const placeRoutes: MetadataRoute.Sitemap = places.map((place) => ({
    url: `${baseUrl}/places/${place.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const itineraryRoutes: MetadataRoute.Sitemap = itineraries.map((itinerary) => ({
    url: `${baseUrl}/itinerary/${itinerary.slug}`,
    lastModified: itinerary.created_at ? new Date(itinerary.created_at).toISOString() : new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.published_at ? new Date(blog.published_at).toISOString() : new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 3. Define static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/places`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/itinerary`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 4. Return all combined routes
  return [...staticRoutes, ...placeRoutes, ...itineraryRoutes, ...blogRoutes];
}
