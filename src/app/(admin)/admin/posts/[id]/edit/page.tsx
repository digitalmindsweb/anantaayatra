import { getPostById } from "@/services/posts"
import { PostForm } from "@/components/admin/posts/PostForm"
import { notFound } from "next/navigation"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPostById(id)

  if (!post) {
    notFound()
  }

  return <PostForm post={post} />
}
