import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    const uploadedFiles: Array<{ filename: string; url: string }> = []

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    for (const file of files) {
      // Check file size (100MB limit per file)
      if (file.size > 100 * 1024 * 1024) {
        continue // Skip files that are too large
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Create unique filename
      const timestamp = Date.now()
      const random = Math.random().toString(36).substring(2, 8)
      const originalName = file.name
      const extension = path.extname(originalName)
      const filename = `${timestamp}-${random}${extension}`

      // Save file
      const filePath = path.join(uploadsDir, filename)
      await writeFile(filePath, buffer)

      uploadedFiles.push({
        filename,
        url: `/uploads/${filename}`,
      })
    }

    return NextResponse.json({ 
      success: true,
      uploadedFiles 
    })
  } catch (error) {
    console.error('Error uploading files:', error)
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    )
  }
}


