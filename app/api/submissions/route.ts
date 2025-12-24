import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const submission = await prisma.submission.create({
      data: {
        type: body.type || "hero-submission",
        name: body.name,
        email: body.email,
        phone: body.phone,
        telegramUsername: body.telegramUsername,
        heroName: body.heroName,
        residence: body.residence,
        birthDate: body.birthDate,
        deathDate: body.deathDate,
        heroStory: body.heroStory,
        message: body.message,
        imageUrl: body.imageUrl,
        mediaFiles: body.mediaFiles || [],
        status: "pending",
      },
    })

    // Send Telegram notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const telegramMessage = `
НОВА ЗАЯВКА!

Тип: ${body.type === 'hero-submission' ? 'Додати героя' : 'Інше'}
${body.heroName ? `Герой: ${body.heroName}` : ''}
${body.phone ? `Телефон: ${body.phone}` : ''}
${body.telegramUsername ? `Telegram: ${body.telegramUsername}` : ''}
${body.residence ? `Місце: ${body.residence}` : ''}
${body.mediaFiles && body.mediaFiles.length > 0 ? `Фото: ${body.mediaFiles.length} шт.` : ''}

Переглянути: ${process.env.NEXTAUTH_URL}/admin/submissions/${submission.id}
        `.trim()

        await fetch(
          `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: process.env.TELEGRAM_CHAT_ID,
              text: telegramMessage,
              parse_mode: "HTML",
            }),
          }
        )
      } catch (telegramError) {
        console.error("Failed to send Telegram notification:", telegramError)
        // Don't fail the request if Telegram fails
      }
    }

    return NextResponse.json(submission, { status: 201 })
  } catch (error) {
    console.error("Error creating submission:", error)
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const countOnly = searchParams.get('countOnly')
    
    if (countOnly === 'true') {
      const count = await prisma.submission.count({
        where: { status: "pending" }
      })
      return NextResponse.json({ count })
    }
    
    const submissions = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
    })
    
    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch submissions" },
      { status: 500 }
    )
  }
}

