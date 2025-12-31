import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const submission = await prisma.submission.findUnique({
      where: { id: params.id },
    })

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(submission)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const submission = await prisma.submission.update({
      where: { id: params.id },
      data: {
        status: body.status,
      },
    })

    return NextResponse.json(submission)
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await prisma.submission.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    )
  }
}




