import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    let settings = await prisma.yourStoriesPageSettings.findFirst({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await prisma.yourStoriesPageSettings.create({
        data: {
          id: 'default',
          bannerTitle_ua: 'ВАШІ ІСТОРІЇ',
          bannerSubtitle_ua: 'Ми створюємо місце, де на стінах з\'являються портрети загиблих військових.',
          searchPlaceholder_ua: 'Позивний/ПІБ',
          formTitle_ua: 'у кожного — свій захисник, своя історія',
          formSubtitle_ua: 'Поділись історією свого героя',
          formButtonText_ua: 'Заповнити форму',
          bannerTitle_en: 'YOUR STORIES',
          bannerSubtitle_en: 'We create a place where portraits of fallen soldiers appear on the walls.',
          searchPlaceholder_en: 'Call Sign/Name',
          formTitle_en: 'everyone has their own protector, their own story',
          formSubtitle_en: 'Share your hero\'s story',
          formButtonText_en: 'Fill out the form',
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
    
    const settings = await prisma.yourStoriesPageSettings.upsert({
      where: { id: 'default' },
      update: {
        bannerTitle_ua: body.bannerTitle_ua,
        bannerSubtitle_ua: body.bannerSubtitle_ua,
        searchPlaceholder_ua: body.searchPlaceholder_ua,
        formTitle_ua: body.formTitle_ua,
        formSubtitle_ua: body.formSubtitle_ua,
        formButtonText_ua: body.formButtonText_ua,
        bannerTitle_en: body.bannerTitle_en,
        bannerSubtitle_en: body.bannerSubtitle_en,
        searchPlaceholder_en: body.searchPlaceholder_en,
        formTitle_en: body.formTitle_en,
        formSubtitle_en: body.formSubtitle_en,
        formButtonText_en: body.formButtonText_en,
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

