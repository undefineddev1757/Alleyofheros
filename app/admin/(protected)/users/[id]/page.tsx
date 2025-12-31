"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EditUser({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "writer",
    isActive: true,
    twoFactorEnabled: false,
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/users/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setFormData({
            name: data.name || "",
            email: data.email || "",
            role: data.role || "writer",
            isActive: data.isActive,
            twoFactorEnabled: data.twoFactorEnabled,
          })
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setFetching(false)
      }
    }

    fetchUser()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/users")
        router.refresh()
      }
    } catch (error) {
      console.error("Error updating user:", error)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Редактировать пользователя</h1>
          <p className="text-muted-foreground">
            Измените данные и права пользователя
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Информация о пользователе</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Иван Петров"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled
              />
              <p className="text-xs text-muted-foreground">
                Email нельзя изменить
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Роль</Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="writer">Писатель</option>
                <option value="admin">Администратор</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Администраторы имеют полный доступ
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="h-4 w-4"
              />
              <Label htmlFor="isActive" className="cursor-pointer">
                Пользователь активен
              </Label>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    Двухфакторная аутентификация (2FA)
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Статус: {formData.twoFactorEnabled ? "Включена" : "Выключена"}
                  </div>
                </div>
                <Link href={`/admin/users/${params.id}/2fa`}>
                  <Button type="button" variant="outline">
                    Настроить 2FA
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? "Сохранение..." : "Сохранить изменения"}
              </Button>
              <Link href="/admin/users">
                <Button type="button" variant="outline">
                  Отмена
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}




