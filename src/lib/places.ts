import { supabase } from "./supabase";
import type { PlaceContent } from "@/data/content";

interface PlaceRow {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
    image_url?: string | null;
    country?: string | null;
    state?: string | null;
    tags?: string[] | null;
    created_at?: string | null;
    content?: string | null;
    best_time_to_visit?: string | null;
    highlights?: string[] | null;
}

// 🔹 INTERNAL mapping (NOT exported)
function mapPlace(place: PlaceRow): PlaceContent {
    return {
        id: place.id,
        slug: place.slug,

        // UI required fields
        title: place.name,
        excerpt: place.description || "No description available",
        content: place.content || "",

        imageUrl: place.image_url || "",
        tags: place.tags || [],

        // IMPORTANT for routing
        type: "place",
        category: "Destination",

        // Optional fields UI expects
        date: "", // or you can format created_at
        readTime: "",
        location: place.state || place.country || "",
        bestTimeToVisit: place.best_time_to_visit || "",
        highlights: place.highlights || [],
    };
}

// ✅ Get all places
export async function getPlaces(): Promise<PlaceContent[]> {
    const { data, error } = await supabase
        .from("places")
        .select("*");

    if (error) {
        console.error("Error fetching places:", error.message);
        return [];
    }

    return data.map(mapPlace);
}

export async function getPlaceBySlug(slug: string): Promise<PlaceContent | null> {
    const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("slug", slug)
        .maybeSingle(); // ✅ IMPORTANT

    if (error) return null;
    if (!data) return null;

    return mapPlace(data);
}
