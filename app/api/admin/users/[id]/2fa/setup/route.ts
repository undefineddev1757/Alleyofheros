import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../../../auth/[...nextauth]/route"
import speakeasy from "speakeasy"
import QRCode from "qrcode"

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const user = await prisma.admin.findUnique({
      where: { id: params.id },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `Alley of Heroes (${user.email})`,
      issuer: "Alley of Heroes",
    })

    // Generate QR code
    const qrCode = await QRCode.toDataURL(secret.otpauth_url!)

    // Save secret (but don't enable 2FA yet)
    await prisma.admin.update({
      where: { id: params.id },
      data: {
        twoFactorSecret: secret.base32,
      },
    })

    return NextResponse.json({
      secret: secret.base32,
      qrCode,
    })
  } catch (error) {
    console.error("Error setting up 2FA:", error)
    return NextResponse.json(
      { error: "Failed to setup 2FA" },
      { status: 500 }
    )
  }
}

