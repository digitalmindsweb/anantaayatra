import { NextRequest } from 'next/server'
import * as ftp from 'basic-ftp'
import { Readable } from 'stream'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return Response.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ]

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        {
          error:
            'Invalid file type. Only JPEG, PNG, WebP, GIF, SVG allowed.',
        },
        { status: 400 }
      )
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'

    const baseName = file.name
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase()

    const timestamp = Date.now()

    const fileName = `${baseName}_${timestamp}.${ext}`

    // Read file buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // FTP Upload
    const client = new ftp.Client()

    client.ftp.verbose = true

    try {
      await client.access({
        host: process.env.FTP_HOST!,
        user: process.env.FTP_USER!,
        password: process.env.FTP_PASSWORD!,
        port: parseInt(process.env.FTP_PORT || '21'),
        secure: process.env.FTP_SECURE === 'true',
      })

      // DEBUG LOGS
      console.log('FTP Current Directory:', await client.pwd())

      const list = await client.list()
      console.log('FTP Root List:', list)

      // Create uploads directory if not exists
      await client.ensureDir('uploads')

      // Move into uploads folder
      //await client.cd('uploads')

      console.log('FTP Upload Directory:', await client.pwd())

      // Upload file
      const readableStream = Readable.from(buffer)

      await client.uploadFrom(readableStream, fileName)

      console.log('Upload Success:', fileName)
    } finally {
      client.close()
    }

    // Public URL
    const domain =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

    const publicUrl = `${domain}/uploads/${fileName}`

    return Response.json(
      {
        success: true,
        url: publicUrl,
        fileName,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('[upload] FTP error:', err)

    const message =
      err instanceof Error ? err.message : 'Upload failed'

    return Response.json(
      { error: message },
      { status: 500 }
    )
  }
}