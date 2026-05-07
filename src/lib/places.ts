import { supabase } from "./supabase";
import type { PlaceContent } from "@/data/content";

interface PlaceRow {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
    excerpt?: string | null;       // new admin field
    image_url?: string | null;
    country?: string | null;
    state?: string | null;
    tags?: string[] | null;
    created_at?: string | null;
    content?: string | null;
    best_time_to_visit?: string | null;
    highlights?: string[] | null;
    status?: string | null;
}

// 🔹 INTERNAL mapping
function mapPlace(place: PlaceRow): PlaceContent {
    return {
        id: place.id,
        slug: place.slug,

        // name → title for UI
        title: place.name,

        // Use admin excerpt first, fall back to description, then empty string
        // Never return "No description available" — let the UI handle empty state
        excerpt: place.excerpt || place.description || "",

        // Use content first, fall back to description
        content: place.content || place.description || "",

        imageUrl: place.image_url || "",
        tags: place.tags || [],

        type: "place",
        category: "Destination",

        date: "",
        readTime: "",
        location: place.state || place.country || "",
        bestTimeToVisit: place.best_time_to_visit || "",
        highlights: place.highlights || [],
    };
}

// ✅ Get published places only — for public listing and homepage
export async function getPlaces(): Promise<PlaceContent[]> {
    const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching places:", error.message);
        return [];
    }

    return data.map(mapPlace);
}

// ✅ Get a single place by slug — published only for public pages
export async function getPlaceBySlug(slug: string): Promise<PlaceContent | null> {
    const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) return null;
    if (!data) return null;

    return mapPlace(data);
}
