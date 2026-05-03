import { supabase } from "./supabase"
import type { BlogContent } from "@/data/content"

export interface Blog {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url?: string
  published_at?: string
  read_time_int?: number
  category?: string
  tags: string[]
  author?: string
  place_id?: string
}

// ✅ Common select
const BLOG_SELECT = `
  id,
  slug,
  title,
  excerpt,
  content,
  image_url,
  category,
  tags,
  author,
  read_time_int,
  published_at,
  place_id
`

// ✅ Get all blogs
export async function getPublishedBlogs(): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false })

  if (error) {
    console.error("❌ Error fetching blogs:", error)
    return []
  }

  return data || []
}

// ✅ Get single blog
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const { data, error } = await supabase
    .from("posts")
    .select(BLOG_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle()

  if (error) {
    console.error("❌ Error fetching blog:", error)
    return null
  }

  return data
}

// ✅ Latest blogs
export async function getLatestBlogs(limit = 3): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("❌ Error fetching latest blogs:", error)
    return []
  }

  return data || []
}

// ✅ Blogs by place
export async function getBlogsByPlace(placeId: string): Promise<Blog[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(BLOG_SELECT)
    .eq("place_id", placeId)
    .eq("status", "published")

  if (error) {
    console.error("❌ Error fetching blogs by place:", error)
    return []
  }

  return data || []
}

// ✅ Blogs by category
export async function getBlogsByCategory(category: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .eq("category", category)

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}

// ✅ Blogs by tag
export async function getBlogsByTag(tag: string) {
  const { data, error } = await supabase
    .from("posts")
    .select(BLOG_SELECT)
    .eq("status", "published")
    .contains("tags", [tag])

  if (error) {
    console.error(error)
    return []
  }

  return data || []
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
    date: blog.published_at || "",
    readTime: `${blog.read_time_int || 0} min read`,
    category: blog.category || "",
    tags: blog.tags || [],
    author: blog.author || "",
  };
}
