import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const files = await prisma.mediaFile.findMany({
      where: search ? {
        OR: [
          { originalName: { contains: search, mode: 'insensitive' } },
          { filename: { contains: search, mode: 'insensitive' } },
        ],
      } : {},
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(files)
  } catch (error) {
    console.error('Error fetching media files:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    )
  }
}



