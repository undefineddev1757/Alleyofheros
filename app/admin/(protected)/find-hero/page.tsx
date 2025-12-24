"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save } from "lucide-react"

export default function FindHeroEdit() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    bannerTitle: '',
    searchPlaceholder: '',
    medalImageUrl: '',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/find-hero-settings')
        if (response.ok) {
          const data = await response.json()
          setFormData({
            bannerTitle: data.bannerTitle || '',
            searchPlaceholder: data.searchPlaceholder || '',
            medalImageUrl: data.medalImageUrl || '',
          })
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      } finally {
        setFetching(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/find-hero-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error updating settings:', error)
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
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold">Редактирование страницы "Найти героя"</h1>
        <p className="text-muted-foreground">
          Управление контентом страницы поиска героев
        </p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Изменения успешно сохранены!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Banner Section */}
        <Card>
          <CardHeader>
            <CardTitle>Баннер страницы</CardTitle>
            <CardDescription>Заголовок и настройки поиска</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bannerTitle">Заголовок</Label>
              <Input
                id="bannerTitle"
                value={formData.bannerTitle}
                onChange={(e) => setFormData({ ...formData, bannerTitle: e.target.value })}
                placeholder="Знайти героя"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchPlaceholder">Текст в поиске (placeholder)</Label>
              <Input
                id="searchPlaceholder"
                value={formData.searchPlaceholder}
                onChange={(e) => setFormData({ ...formData, searchPlaceholder: e.target.value })}
                placeholder="Позивний/ПІБ"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medalImageUrl">URL изображения медали</Label>
              <Input
                id="medalImageUrl"
                value={formData.medalImageUrl}
                onChange={(e) => setFormData({ ...formData, medalImageUrl: e.target.value })}
                placeholder="https://..."
              />
              {formData.medalImageUrl && (
                <div className="mt-2">
                  <img 
                    src={formData.medalImageUrl} 
                    alt="Medal preview" 
                    className="w-32 h-32 object-contain border rounded"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-4 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
          <Button type="submit" disabled={loading} size="lg" className="flex-1">
            <Save className="mr-2 h-5 w-5" />
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
        </div>
      </form>
    </div>
  )
}

