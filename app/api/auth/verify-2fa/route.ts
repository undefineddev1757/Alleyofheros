import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import speakeasy from "speakeasy"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, token } = body

    if (!userId || !token) {
      return NextResponse.json(
        { error: "User ID and token are required" },
        { status: 400 }
      )
    }

    const user = await prisma.admin.findUnique({
      where: { id: userId },
      select: {
        twoFactorSecret: true,
        twoFactorEnabled: true,
        isActive: true,
      },
    })

    if (!user || !user.isActive || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      )
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 2, // Allow 2 time steps before/after current time
    })

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying 2FA:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}



