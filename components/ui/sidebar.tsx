"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut,
  Menu,
  X,
  Home,
  ChevronDown,
  ChevronUp,
  FileStack,
  Inbox
} from "lucide-react"
import { signOut } from "next-auth/react"
import { Button } from "./button"

const menuItems = [
  {
    title: "Панель",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Страницы",
    icon: FileStack,
    submenu: [
      {
        title: "Главная",
        href: "/admin/home-page",
      },
      {
        title: "Ваши истории",
        href: "/admin/pages",
      },
      {
        title: "Найти героя",
        href: "/admin/pages",
      },
    ],
  },
  {
    title: "Герои",
    href: "/admin/heroes",
    icon: Users,
  },
  {
    title: "Истории",
    href: "/admin/stories",
    icon: FileText,
  },
  {
    title: "Заявки",
    href: "/admin/submissions",
    icon: Inbox,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [expandedMenus, setExpandedMenus] = React.useState<Record<string, boolean>>({})
  const [pendingCount, setPendingCount] = React.useState(0)

  React.useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const response = await fetch('/api/submissions')
        if (response.ok) {
          const data = await response.json()
          setPendingCount(data.count)
        }
      } catch (error) {
        console.error('Failed to fetch pending count:', error)
      }
    }

    fetchPendingCount()
    // Refresh count every 30 seconds
    const interval = setInterval(fetchPendingCount, 30000)
    return () => clearInterval(interval)
  }, [])

  const toggleSubmenu = (title: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }))
  }

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Админ-панель</h2>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              const hasSubmenu = 'submenu' in item
              const isExpanded = expandedMenus[item.title]

              if (hasSubmenu) {
                return (
                  <div key={item.title}>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-accent"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.submenu.map((subitem) => {
                          const isSubActive = pathname === subitem.href
                          return (
                            <Link
                              key={subitem.href}
                              href={subitem.href}
                              onClick={() => setIsOpen(false)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm",
                                isSubActive
                                  ? "bg-primary text-primary-foreground"
                                  : "hover:bg-accent"
                              )}
                            >
                              {subitem.title}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1">{item.title}</span>
                  {item.title === "Заявки" && pendingCount > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-600 text-white text-xs font-semibold rounded-full">
                      {pendingCount}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Выйти
            </Button>
          </div>
        </div>
      </aside>
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

