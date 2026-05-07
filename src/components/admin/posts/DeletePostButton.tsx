"use client"
import { deletePostAction } from "@/actions/posts"
import { Trash2 } from "lucide-react"
import { useTransition } from "react"

export function DeletePostButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      onClick={() => {
        if (confirm("Are you sure you want to delete this post?")) {
          startTransition(() => {
            deletePostAction(id)
          })
        }
      }}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 p-2 disabled:opacity-50 transition-colors"
      title="Delete post"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
