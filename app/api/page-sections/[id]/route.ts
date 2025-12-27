import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const section = await prisma.pageSection.findUnique({
      where: { id: params.id },
    })

    if (!section) {
      return NextResponse.json(
        { error: "Section not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(section)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch section" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const section = await prisma.pageSection.update({
      where: { id: params.id },
      data: {
        sectionKey: body.sectionKey,
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        imageUrl: body.imageUrl,
        videoUrl: body.videoUrl,
        isActive: body.isActive,
        order: body.order,
      },
    })

    return NextResponse.json(section)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update section" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.pageSection.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete section" },
      { status: 500 }
    )
  }
}


