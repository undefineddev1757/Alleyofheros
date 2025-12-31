import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// GET single hero
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hero = await prisma.hero.findUnique({
      where: { id: params.id },
    })

    if (!hero) {
      return NextResponse.json(
        { error: 'Hero not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error fetching hero:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero' },
      { status: 500 }
    )
  }
}

// PUT update hero
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    const hero = await prisma.hero.update({
      where: { id: params.id },
      data: {
        callSign: body.callSign,
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        bannerUrl: body.bannerUrl,
        content: body.content || null,
        isActive: body.isActive,
      },
    })

    return NextResponse.json(hero)
  } catch (error) {
    console.error('Error updating hero:', error)
    return NextResponse.json(
      { error: 'Failed to update hero' },
      { status: 500 }
    )
  }
}

// DELETE hero
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.hero.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting hero:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero' },
      { status: 500 }
    )
  }
}

