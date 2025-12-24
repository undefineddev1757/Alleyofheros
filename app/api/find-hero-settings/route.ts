import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    let settings = await prisma.findHeroPageSettings.findFirst({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await prisma.findHeroPageSettings.create({
        data: {
          id: 'default',
          bannerTitle: 'Знайти героя',
          searchPlaceholder: 'Позивний/ПІБ',
          medalImageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/12daba71a01ffc2fafdfaa3af92bdeb993584487?width=560',
          isActive: true,
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    const settings = await prisma.findHeroPageSettings.upsert({
      where: { id: 'default' },
      update: {
        bannerTitle: body.bannerTitle,
        searchPlaceholder: body.searchPlaceholder,
        medalImageUrl: body.medalImageUrl,
      },
      create: {
        id: 'default',
        ...body,
        isActive: true,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

