import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../../auth/[...nextauth]/route"
import speakeasy from "speakeasy"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    const user = await prisma.admin.findUnique({
      where: { id: params.id },
    })

    if (!user || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: "2FA not set up" },
        { status: 400 }
      )
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token,
      window: 2,
    })

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      )
    }

    // Enable 2FA
    await prisma.admin.update({
      where: { id: params.id },
      data: {
        twoFactorEnabled: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error verifying 2FA:", error)
    return NextResponse.json(
      { error: "Failed to verify 2FA" },
      { status: 500 }
    )
  }
}



