import { supabase } from "./supabase"
import type { ItineraryContent } from "@/data/content"

// 🔹 Raw DB type
interface ItineraryRow {
    id: string
    slug: string
    title: string
    description?: string
    content?: string
    image_url?: string
    duration?: string
    location?: string
    category?: string
    read_time?: string
    published_at?: string
    tags?: string[]
    place_id?: string
    day_wise_plan?: any
}

// 🔹 Fetch all itineraries
export async function getItineraries() {
    const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false })

    if (error) {
        console.error("Error fetching itineraries:", error.message)
        return []
    }

    return data
}

// 🔹 Fetch by place
export async function getItinerariesByPlace(placeId: string) {
    const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("place_id", placeId)
        .eq("status", "published")

    if (error) {
        console.error("Error fetching itineraries:", error.message)
        return []
    }

    return data
}

// 🔹 Fetch single
export async function getItineraryBySlug(slug: string) {
    const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .eq("slug", slug)
        .maybeSingle()

    if (error) {
        console.error("Error:", error.message)
        return null
    }

    return data
}

// 🔹 Mapping → UI format
export function mapItineraryToContent(item: ItineraryRow): ItineraryContent {
    return {
        id: item.id,
        type: "itinerary",
        slug: item.slug,
        title: item.title,
        excerpt: item.description || "",
        content: item.content || "",
        imageUrl: item.image_url || "",
        date: item.published_at
            ? new Date(item.published_at).toDateString()
            : "",
        readTime: item.read_time || "",
        category: item.category || "Travel",
        tags: item.tags || [],
        location: item.location || "",
        duration: item.duration || "",
        dayWisePlan: item.day_wise_plan || []
    }
}
