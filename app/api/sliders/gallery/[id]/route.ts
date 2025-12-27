import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const slide = await prisma.gallerySlide.findUnique({
      where: { id: params.id },
    })

    if (!slide) {
      return NextResponse.json(
        { error: "Slide not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(slide)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch slide" },
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
    const slide = await prisma.gallerySlide.update({
      where: { id: params.id },
      data: {
        imageUrl: body.imageUrl,
        caption: body.caption,
        order: body.order,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(slide)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update slide" },
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
    await prisma.gallerySlide.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete slide" },
      { status: 500 }
    )
  }
}


