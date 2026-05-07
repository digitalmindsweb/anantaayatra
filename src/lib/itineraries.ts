import { supabase } from "./supabase"

export interface ItineraryDay {
    id: string
    day_number: number
    title: string
    description: string
    places: {
        id: string
        name: string
        slug: string
    }[]
}

export interface Itinerary {
    id: string
    title: string
    slug: string
    description?: string
    image_url?: string
    days: ItineraryDay[]
}

// ✅ Get all itineraries (list page)
export async function getItineraries() {
    const { data, error } = await supabase
        .from("itineraries")
        .select("*")
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching itineraries:", error)
        return []
    }

    return data || []
}

export async function getItineraryBySlug(slug: string): Promise<Itinerary | null> {
    // 🔹 1. Get itinerary
    const { data: itinerary, error: itineraryError } = await supabase
        .from("itineraries")
        .select("id, title, slug, description, image_url")
        .eq("slug", slug)
        .maybeSingle()

    if (itineraryError) {
        console.error("❌ itinerary error:", itineraryError)
        return null
    }

    if (!itinerary) return null

    // 🔹 2. Get days
    const { data: daysData, error: daysError } = await supabase
        .from("itinerary_days")
        .select("id, day_number, title, description")
        .eq("itinerary_id", itinerary.id)
        .order("day_number", { ascending: true })

    if (daysError) {
        console.error("❌ days error:", daysError)
        return null
    }

    // 🔹 3. Get places (grouped by day_number, matching actual schema)
    const { data: itineraryPlaces, error: placesError } = await supabase
        .from("itinerary_places")
        .select("id, day_number, place_name, place_slug, description")
        .eq("itinerary_id", itinerary.id)

    if (placesError) {
        console.error("❌ itinerary_places error:", placesError)
        // continue — page renders without places rather than 404
    }

    // 🔹 4. Attach places to their day by day_number
    const days: ItineraryDay[] =
        daysData?.map((day) => {
            const places = (itineraryPlaces ?? [])
                .filter((p: any) => p.day_number === day.day_number)
                .map((p: any) => ({
                    id: p.id,
                    name: p.place_name,   // map place_name → name for UI
                    slug: p.place_slug ?? "",
                }))

            return {
                id: day.id,
                day_number: day.day_number,
                title: day.title,
                description: day.description,
                places,
            }
        }) || []

    return {
        ...itinerary,
        days,
    } as Itinerary
}

// ✅ Mapping for UI
export function mapItineraryToContent(itinerary: any) {
    return {
        id: itinerary.id,
        type: "itinerary",
        slug: itinerary.slug,
        title: itinerary.title,
        excerpt: itinerary.description || "",
        content: itinerary.description || "",
        imageUrl: itinerary.image_url || "",
        date: "",
        readTime: "",
        category: "",
        tags: [],
        author: "",
    }
}