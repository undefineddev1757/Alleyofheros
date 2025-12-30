"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ImageUpload } from "@/components/admin/ImageUpload"
import { BlockConstructor } from "@/components/admin/BlockConstructor"
import { HeroBlock } from "@/types/hero-blocks"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function NewHeroPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    callSign: "",
    name: "",
    description: "",
    imageUrl: "",
    bannerUrl: "",
    isActive: true,
  })
  const [blocks, setBlocks] = useState<HeroBlock[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.callSign || !formData.name) {
      toast({
        title: "Ошибка",
        description: "Позывной и Имя Фамилия обязательны",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/heroes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          content: { blocks },
        }),
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Герой успешно создан",
        })
        router.push("/admin/heroes")
      } else {
        const error = await response.json()
        toast({
          title: "Ошибка",
          description: error.error || "Не удалось создать героя",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Произошла ошибка при создании героя",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/heroes">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Создать героя</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          {/* Основная информация */}
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="callSign">Позывной *</Label>
                <Input
                  id="callSign"
                  value={formData.callSign}
                  onChange={(e) => setFormData({ ...formData, callSign: e.target.value })}
                  placeholder="Жрець"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Имя Фамилия *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Володимир Плетньов"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Показывать на сайте</Label>
              </div>
            </CardContent>
          </Card>

          {/* Изображения */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Изображения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImageUpload
                  label="Фотография (как паспорт)"
                  value={formData.imageUrl}
                  onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  description="Портретное фото героя"
                />

                <ImageUpload
                  label="Баннер (1440 × 800 px)"
                  value={formData.bannerUrl}
                  onChange={(url) => setFormData({ ...formData, bannerUrl: url })}
                  aspectRatio="1440x800"
                  description="Широкоформатное изображение для страницы героя"
                />
              </CardContent>
            </Card>
          </div>

          {/* Конструктор блоков */}
          <Card>
            <CardHeader>
              <CardTitle>Контент сторінки</CardTitle>
            </CardHeader>
            <CardContent>
              <BlockConstructor blocks={blocks} onChange={setBlocks} />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Link href="/admin/heroes">
            <Button type="button" variant="outline">
              Отмена
            </Button>
          </Link>
          <Button type="submit" disabled={loading}>
            {loading ? "Создание..." : "Создать героя"}
          </Button>
        </div>
      </form>
    </div>
  )
}

