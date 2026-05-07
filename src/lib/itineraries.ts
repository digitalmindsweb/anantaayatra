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

    // 🔹 3. Get itinerary_places (NO day_number)
    const { data: itineraryPlaces, error: placesError } = await supabase
        .from("itinerary_places")
        .select("*")
        .eq("itinerary_id", itinerary.id)

    if (placesError) {
        console.error("❌ itinerary_places error:", placesError)
        // DONT return null so page can still load without places
    }

    // 🔹 4. Get places
    const placeIds = itineraryPlaces?.map((p: any) => p.place_id || p.places_id || p.id) || []

    const { data: placesData, error: placesFetchError } = await supabase
        .from("places")
        .select("id, name, slug")
        .in("id", placeIds)

    if (placesFetchError) {
        console.error("❌ places fetch error:", placesFetchError)
    }

    // 🔹 5. Group (TEMP: all places under each day)
    const days: ItineraryDay[] =
        daysData?.map((day) => {
            const places =
                itineraryPlaces
                    ?.map((p) =>
                        placesData?.find((pl) => pl.id === p.place_id)
                    )
                    .filter(Boolean) || []

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