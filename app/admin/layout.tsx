"use client"

import { useEffect } from "react"

// This layout is now only for protected admin pages
// Login page has its own layout
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Add admin-page class to body to show normal cursor
    document.body.classList.add('admin-page')
    return () => {
      document.body.classList.remove('admin-page')
    }
  }, [])

  return <>{children}</>
}

