import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const sections = await prisma.pageSection.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(sections)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch sections" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const section = await prisma.pageSection.create({
      data: {
        sectionKey: body.sectionKey,
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl,
        isActive: body.isActive ?? true,
        order: body.order ?? 0,
      },
    })

    return NextResponse.json(section)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create section" },
      { status: 500 }
    )
  }
}


