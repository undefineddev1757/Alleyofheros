import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    let settings = await prisma.footerSettings.findFirst({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await prisma.footerSettings.create({
        data: {
          id: 'default',
          copyrightText: '© 2024 Алея Друзів. Всі права захищені.',
          isActive: true,
        },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error fetching footer settings:', error)
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
    
    const settings = await prisma.footerSettings.upsert({
      where: { id: 'default' },
      update: {
        aboutText: body.aboutText,
        copyrightText: body.copyrightText,
        email: body.email,
        phone: body.phone,
        address: body.address,
        facebookUrl: body.facebookUrl,
        instagramUrl: body.instagramUrl,
        twitterUrl: body.twitterUrl,
        youtubeUrl: body.youtubeUrl,
        telegramUrl: body.telegramUrl,
        linkedinUrl: body.linkedinUrl,
        privacyPolicyUrl: body.privacyPolicyUrl,
        termsOfServiceUrl: body.termsOfServiceUrl,
      },
      create: {
        id: 'default',
        ...body,
        isActive: true,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error updating footer settings:', error)
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    )
  }
}

