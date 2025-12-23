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
        heroName: body.heroName,
        heroStory: body.heroStory,
        message: body.message,
        imageUrl: body.imageUrl,
        status: "pending",
      },
    })

    // Send Telegram notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      try {
        const telegramMessage = `
🔔 Нова заявка!

Тип: ${body.type === 'hero-submission' ? 'Додати героя' : 'Інше'}
Ім'я: ${body.name}
${body.heroName ? `Герой: ${body.heroName}` : ''}
${body.phone ? `Телефон: ${body.phone}` : ''}
${body.email ? `Email: ${body.email}` : ''}

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

export async function GET() {
  try {
    const count = await prisma.submission.count({
      where: { status: "pending" }
    })
    
    return NextResponse.json({ count })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch submissions count" },
      { status: 500 }
    )
  }
}

