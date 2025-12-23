import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for login page entirely
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }

  // Check if user is authenticated for other /admin routes
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // If not authenticated, redirect to login
  if (!token) {
    const url = new URL("/admin/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Protect /admin routes but exclude /admin/login
export const config = {
  matcher: [
    "/admin/:path*",
  ],
}

