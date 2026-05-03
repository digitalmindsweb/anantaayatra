import { supabase } from "./supabase";

// 🔹 INTERNAL mapping (NOT exported)
function mapPlace(place: any) {
    return {
        id: place.id,
        slug: place.slug,

        // UI required fields
        title: place.name,
        excerpt: place.description || "No description available",

        imageUrl: place.image_url,
        tags: place.tags || [],

        // IMPORTANT for routing
        type: "place",
        category: "Destination",

        // Optional fields UI expects
        date: "", // or you can format created_at
        location: place.state || place.country || "",
    };
}

// ✅ Get all places
export async function getPlaces() {
    const { data, error } = await supabase
        .from("places")
        .select("*");

    if (error) {
        console.error("Error fetching places:", error.message);
        return [];
    }

    return data.map(mapPlace);
}

export async function getPlaceBySlug(slug: string) {
    const { data, error } = await supabase
        .from("places")
        .select("*")
        .eq("slug", slug)
        .maybeSingle(); // ✅ IMPORTANT

    console.log("Slug:", slug);
    console.log("DB Result:", data);
    console.log("Error:", error);

    if (error) return null;
    if (!data) return null;

    return mapPlace(data);
}