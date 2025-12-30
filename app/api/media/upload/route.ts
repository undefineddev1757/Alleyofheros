import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (100MB limit)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 100MB limit' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const originalName = file.name
    const extension = path.extname(originalName)
    const filename = `${timestamp}${extension}`

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Save file
    const filePath = path.join(uploadsDir, filename)
    await writeFile(filePath, buffer)

    // Save to database
    const mediaFile = await prisma.mediaFile.create({
      data: {
        filename,
        originalName,
        mimeType: file.type,
        size: file.size,
        url: `/uploads/${filename}`,
        createdBy: session.user?.email || 'unknown',
      },
    })

    return NextResponse.json(mediaFile)
  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    )
  }
}



