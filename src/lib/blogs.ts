import { supabase } from "./supabase"
import type { BlogContent } from "@/data/content"

// 👉 Type for your blog (adjust if needed)
export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  published_at?: string
  read_time?: string
  category?: string
  tags?: string[]
  author?: string
}

interface BlogRow {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url?: string | null
  published_at?: string | null
  read_time?: string | null
  category?: string | null
  tags?: string[] | null
  author?: string | null
}

// 🔹 Helper: map DB → UI (important)
function mapBlog(row: BlogRow): Blog {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    image_url: row.image_url || undefined,
    published_at: row.published_at || undefined,
    read_time: row.read_time || undefined,
    category: row.category || undefined,
    tags: row.tags || [],
    author: row.author || undefined,
  }
}


// ✅ 1. Get ALL published blogs
export async function getPublishedBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "blog")
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error.message)
    return []
  }

  return data.map(mapBlog)
}


// ✅ 2. Get SINGLE blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()

  if (error) {
    console.error("Error fetching blog:", error.message)
    return null
  }

  return mapBlog(data)
}


// ✅ 3. Get latest blogs (for homepage)
export async function getLatestBlogs(limit = 3): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "blog")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching latest blogs:", error.message)
    return []
  }

  return data.map(mapBlog)
}


// ✅ 4. (Optional but useful) Get all slugs (for SEO / static params)
export async function getAllBlogSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("slug")
    .eq("type", "blog")
    .eq("status", "published")

  if (error) {
    console.error("Error fetching slugs:", error.message)
    return []
  }

  return data.map((item) => item.slug)
}

function formatPublishedDate(date?: string) {
  if (!date) {
    return ""
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(parsedDate)
}

export function mapBlogToContent(blog: Blog): BlogContent {
  return {
    id: blog.id,
    type: "blog",
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    content: blog.content,
    imageUrl: blog.image_url || "",
    date: formatPublishedDate(blog.published_at),
    readTime: blog.read_time || "",
    category: blog.category || "Travel",
    tags: blog.tags || [],
    author: blog.author || "",
  }
}

export async function getBlogsByPlace(placeId: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("place_id", placeId)
    .eq("status", "published");

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return [];
  }

  return data.map(mapBlog); // ✅ FIX
}