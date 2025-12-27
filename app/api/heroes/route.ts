import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""

    const skip = (page - 1) * limit

    const where = search
      ? {
          isActive: true,
          OR: [
            { callSign: { contains: search, mode: "insensitive" as const } },
            { name: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : { isActive: true }

    const [heroes, total] = await Promise.all([
      prisma.hero.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.hero.count({ where }),
    ])

    return NextResponse.json({
      heroes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching heroes:", error)
    return NextResponse.json(
      { error: "Failed to fetch heroes" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const hero = await prisma.hero.create({
      data: {
        callSign: body.callSign,
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        isActive: body.isActive ?? true,
      },
    })

    return NextResponse.json(hero, { status: 201 })
  } catch (error) {
    console.error("Error creating hero:", error)
    return NextResponse.json(
      { error: "Failed to create hero" },
      { status: 500 }
    )
  }
}


