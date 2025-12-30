import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const user = await prisma.admin.findUnique({
      where: { email },
      select: {
        id: true,
        password: true,
        twoFactorEnabled: true,
        isActive: true,
      },
    })

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    return NextResponse.json({
      needs2FA: user.twoFactorEnabled,
      userId: user.twoFactorEnabled ? user.id : undefined,
    })
  } catch (error) {
    console.error("Error checking 2FA:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}



