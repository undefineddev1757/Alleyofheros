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
          bannerTitle: 'ВАШІ ІСТОРІЇ',
          bannerSubtitle: 'Ми створюємо місце, де на стінах з\'являються портрети загиблих військових.',
          searchPlaceholder: 'Позивний/ПІБ',
          formTitle: 'у кожного — свій захисник, своя історія',
          formSubtitle: 'Поділись історією свого героя',
          formButtonText: 'Заповнити форму',
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
        bannerTitle: body.bannerTitle,
        bannerSubtitle: body.bannerSubtitle,
        searchPlaceholder: body.searchPlaceholder,
        formTitle: body.formTitle,
        formSubtitle: body.formSubtitle,
        formButtonText: body.formButtonText,
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

