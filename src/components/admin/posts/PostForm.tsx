"use client"

import * as React from "react"
import { Input } from "@/components/forms/Input"
import { Textarea } from "@/components/forms/Textarea"
import { Select } from "@/components/forms/Select"
import { SubmitButton } from "@/components/forms/SubmitButton"
import { createPostAction, updatePostAction } from "@/actions/posts"
import { Post } from "@/types/post"
import { slugify } from "@/lib/utils/slugify"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const [error, setError] = React.useState<string | null>(null)
  const [slug, setSlug] = React.useState(post?.slug || "")
  const [title, setTitle] = React.useState(post?.title || "")

  const isEdit = !!post

  // Auto-generate slug from title only for new posts, or if user modifies title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    if (!isEdit) {
      setSlug(slugify(e.target.value))
    }
  }

  async function action(formData: FormData) {
    setError(null)
    let res;
    if (isEdit) {
      res = await updatePostAction(post.id, null, formData)
    } else {
      res = await createPostAction(null, formData)
    }

    if (res?.error) {
      setError(res.error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/admin/posts" className="mr-4 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isEdit ? 'Edit Post' : 'Create New Post'}
        </h1>
      </div>

      <form action={action} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm border border-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
              <Input 
                name="title" 
                required 
                value={title}
                onChange={handleTitleChange}
                placeholder="The Ultimate Travel Guide"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Slug</label>
              <Input 
                name="slug" 
                required 
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="the-ultimate-travel-guide"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Content</label>
              <Textarea 
                name="content" 
                defaultValue={post?.content || ""}
                className="min-h-[300px]"
                placeholder="Write your post content here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Excerpt</label>
              <Textarea 
                name="excerpt" 
                defaultValue={post?.excerpt || ""}
                className="min-h-[100px]"
                placeholder="Short summary of the post"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Publishing</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                  <Select 
                    name="status" 
                    defaultValue={post?.status || "draft"}
                    options={[
                      { label: "Draft", value: "draft" },
                      { label: "Published", value: "published" },
                      { label: "Archived", value: "archived" }
                    ]}
                  />
                </div>

                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    name="is_featured" 
                    id="is_featured"
                    defaultChecked={post?.is_featured}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_featured" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                    Featured Post
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Media</h3>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Featured Image URL</label>
                <Input 
                  name="image_url" 
                  defaultValue={post?.image_url || ""}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-slate-500 mt-2">Future: Supabase Storage Upload will go here.</p>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">SEO</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Title</label>
                  <Input 
                    name="meta_title" 
                    defaultValue={post?.meta_title || ""}
                    placeholder="SEO Title (max 60 chars)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Description</label>
                  <Textarea 
                    name="meta_description" 
                    defaultValue={post?.meta_description || ""}
                    className="min-h-[80px]"
                    placeholder="SEO Description (max 160 chars)"
                  />
                </div>
              </div>
            </div>

            <SubmitButton className="w-full">
              {isEdit ? 'Save Changes' : 'Create Post'}
            </SubmitButton>
          </div>
        </div>
      </form>
    </div>
  )
}
