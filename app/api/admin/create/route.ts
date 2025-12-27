import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await prisma.admin.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        name: name || "Admin",
      },
    })

    return NextResponse.json({
      success: true,
      message: `Администратор создан: ${admin.email}`,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Ошибка при создании администратора" },
      { status: 500 }
    )
  }
}


