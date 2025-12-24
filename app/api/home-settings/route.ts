import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    let settings = await prisma.homePageSettings.findFirst({
      where: { id: 'default' },
    })

    if (!settings) {
      // Create default settings if they don't exist
      settings = await prisma.homePageSettings.create({
        data: {
          id: 'default',
          heroTitle: 'Алея',
          heroSubtitle: 'Друзів',
          heroDescription: 'Тут ми пам\'ятаємо не лише подвиги, а й людину за ними',
          isActive: true,
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching home settings:', error)
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
    
    const settings = await prisma.homePageSettings.upsert({
      where: { id: 'default' },
      update: {
        heroTitle: body.heroTitle,
        heroSubtitle: body.heroSubtitle,
        heroDescription: body.heroDescription,
        heroVideoUrl: body.heroVideoUrl,
        aboutLabel: body.aboutLabel,
        aboutTitle: body.aboutTitle,
        aboutText1: body.aboutText1,
        aboutText2: body.aboutText2,
        heroesTitle: body.heroesTitle,
        heroesSubtitle: body.heroesSubtitle,
        showHeroesSlider: body.showHeroesSlider,
        stoneTitle: body.stoneTitle,
        stoneQuote: body.stoneQuote,
        stoneImageUrl: body.stoneImageUrl,
        showStoneBlock: body.showStoneBlock,
        galleryTitle: body.galleryTitle,
        gallerySubtitle: body.gallerySubtitle,
        showGallery: body.showGallery,
      },
      create: {
        id: 'default',
        ...body,
        isActive: true,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating home settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

