import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(request: NextRequest) {
  try {
    // Check if request is from admin (has session)
    const session = await getServerSession(authOptions)
    
    const slides = await prisma.heroSlide.findMany({
      where: session ? {} : { isActive: true }, // Show all slides for admin, only active for public
      orderBy: { order: "asc" },
    })

    return NextResponse.json(slides)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch slides" },
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
    const slide = await prisma.heroSlide.create({
      data: {
        imageUrl: body.imageUrl,
        callSign: body.callSign,
        link: body.link,
        order: body.order ?? 0,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(slide)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create slide" },
      { status: 500 }
    )
  }
}

