"use client"

import { Post } from "@/types/post"
import { DataTable, ColumnDef } from "@/components/tables/DataTable"
import { StatusBadge } from "@/components/admin/StatusBadge"
import { Edit } from "lucide-react"
import Link from "next/link"
import { DeletePostButton } from "./DeletePostButton"

interface PostsListProps {
  data: Post[];
}

export function PostsList({ data }: PostsListProps) {
  const columns: ColumnDef<Post>[] = [
    {
      header: "Title",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.title}</p>
          <p className="text-xs text-slate-500">{row.slug}</p>
        </div>
      )
    },
    {
      header: "Status",
      cell: (row) => <StatusBadge status={row.status} />
    },
    {
      header: "Featured",
      cell: (row) => row.is_featured ? <span className="text-amber-500 text-lg">★</span> : null
    },
    {
      header: "Published At",
      cell: (row) => row.published_at ? new Date(row.published_at).toLocaleDateString() : "-"
    },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/posts/${row.id}/edit`} className="text-brand-600 hover:text-brand-800 p-2 transition-colors">
            <Edit className="h-4 w-4" />
          </Link>
          <DeletePostButton id={row.id} />
        </div>
      )
    }
  ]

  return (
    <DataTable columns={columns} data={data} emptyMessage="No posts found. Create one to get started." />
  )
}
