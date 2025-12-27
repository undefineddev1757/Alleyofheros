"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function EditStory() {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    heroName: "",
    heroStory: "",
    isActive: true,
  })

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setFormData({
            heroName: data.heroName || "",
            heroStory: data.heroStory || "",
            isActive: data.isActive ?? true,
          })
        }
      } catch (error) {
        console.error('Error fetching story:', error)
      } finally {
        setFetching(false)
      }
    }

    if (params.id) {
      fetchStory()
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/stories/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Успешно сохранено",
          description: "История героя обновлена"
        })
        router.push("/admin/stories")
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось обновить историю"
        })
      }
    } catch (error) {
      console.error("Error updating story:", error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при обновлении"
      })
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
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/stories">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Редактировать историю героя</h1>
          <p className="text-muted-foreground">
            Измените информацию о герое
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Информация о герое</CardTitle>
            <CardDescription>Заполните данные о герое и его истории</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heroName">Имя героя *</Label>
              <Input
                id="heroName"
                value={formData.heroName}
                onChange={(e) => setFormData({ ...formData, heroName: e.target.value })}
                placeholder="Олександр Коваленко"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="heroStory">История героя *</Label>
              <Textarea
                id="heroStory"
                value={formData.heroStory}
                onChange={(e) => setFormData({ ...formData, heroStory: e.target.value })}
                rows={8}
                placeholder="Олександр був учителем математики..."
                required
              />
              <p className="text-sm text-muted-foreground">
                Символов: {formData.heroStory.length}
              </p>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="isActive">Показывать на сайте</Label>
                <p className="text-sm text-muted-foreground">
                  Включите, чтобы история отображалась на странице "Ваши истории"
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
          <Button type="submit" disabled={loading} size="lg" className="flex-1">
            <Save className="mr-2 h-5 w-5" />
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/stories')}
            size="lg"
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  )
}

