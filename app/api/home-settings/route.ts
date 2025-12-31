import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
          heroTitle_ua: 'Алея',
          heroSubtitle_ua: 'Друзів',
          heroDescription_ua: 'Тут ми пам\'ятаємо не лише подвиги, а й людину за ними',
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
      update: body,
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




