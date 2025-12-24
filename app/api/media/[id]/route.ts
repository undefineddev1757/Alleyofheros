import { NextRequest, NextResponse } from "next/server"
import { unlink } from "fs/promises"
import path from "path"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const mediaFile = await prisma.mediaFile.findUnique({
      where: { id: params.id },
    })

    if (!mediaFile) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Delete physical file
    const filePath = path.join(process.cwd(), 'public', 'uploads', mediaFile.filename)
    try {
      await unlink(filePath)
    } catch (error) {
      console.error('Error deleting physical file:', error)
    }

    // Delete from database
    await prisma.mediaFile.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting media file:', error)
    return NextResponse.json(
      { error: 'Failed to delete media file' },
      { status: 500 }
    )
  }
}

