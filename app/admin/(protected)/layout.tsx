import { Sidebar } from "@/components/ui/sidebar"
import { ToastProvider } from "@/components/ui/toast"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:ml-64 p-8">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}

