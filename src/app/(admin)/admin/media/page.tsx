'use client'

import { useState, useRef } from 'react'
import { Upload, Copy, CheckCheck, Image as ImageIcon, Loader2, AlertCircle } from 'lucide-react'

export default function MediaPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null
    setFile(selected)
    setUploadedUrl(null)
    setError(null)
    setCopied(false)

    if (selected) {
      const objectUrl = URL.createObjectURL(selected)
      setPreview(objectUrl)
    } else {
      setPreview(null)
    }
  }

  async function handleUpload() {
    if (!file) return
    setUploading(true)
    setError(null)
    setUploadedUrl(null)
    setCopied(false)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      setUploadedUrl(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setUploading(false)
    }
  }

  async function handleCopy() {
    if (!uploadedUrl) return
    await navigator.clipboard.writeText(uploadedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Media Upload</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Upload an image to Hostinger and get a public URL to paste into your CMS.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-sm">

        {/* File Input */}
        <div>
          <label
            htmlFor="media-file-input"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Select Image
          </label>
          <input
            id="media-file-input"
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-600 dark:text-slate-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-slate-100 file:text-slate-700
              dark:file:bg-slate-800 dark:file:text-slate-300
              hover:file:bg-slate-200 dark:hover:file:bg-slate-700
              file:cursor-pointer file:transition-colors
              cursor-pointer"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Accepted: JPEG, PNG, WebP, GIF, SVG
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Preview</p>
            <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-center" style={{ minHeight: '160px', maxHeight: '360px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Upload preview"
                className="max-w-full max-h-[360px] object-contain"
              />
            </div>
            {file && (
              <p className="mt-1.5 text-xs text-slate-400">
                {file.name} — {(file.size / 1024).toFixed(1)} KB
              </p>
            )}
          </div>
        )}

        {/* No file state */}
        {!preview && (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-12">
            <ImageIcon className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
            <p className="text-sm text-slate-400 dark:text-slate-500">No image selected</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          id="media-upload-btn"
          onClick={handleUpload}
          disabled={!file || uploading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold
            bg-brand-600 text-white
            disabled:opacity-50 disabled:cursor-not-allowed
            hover:bg-brand-700 active:bg-brand-800
            transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading…
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload to Hostinger
            </>
          )}
        </button>
      </div>

      {/* Result Card */}
      {uploadedUrl && (
        <div className="mt-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-5 space-y-3">
          <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            ✓ Upload successful
          </p>

          <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
              Public URL
            </p>
            <div className="flex items-center gap-2">
              <input
                id="media-public-url"
                type="text"
                readOnly
                value={uploadedUrl}
                className="flex-1 text-sm px-3 py-2 rounded-lg
                  border border-slate-200 dark:border-slate-700
                  bg-white dark:bg-slate-900
                  text-slate-700 dark:text-slate-200
                  font-mono truncate
                  focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                id="media-copy-url-btn"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium
                  border border-slate-200 dark:border-slate-700
                  bg-white dark:bg-slate-900
                  text-slate-600 dark:text-slate-300
                  hover:bg-slate-50 dark:hover:bg-slate-800
                  transition-colors whitespace-nowrap"
              >
                {copied ? (
                  <>
                    <CheckCheck className="h-4 w-4 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Paste this URL into the <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-xs">image_url</code> field in your CMS.
          </p>
        </div>
      )}
    </div>
  )
}
