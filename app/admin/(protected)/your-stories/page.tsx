"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LanguageToggle, Language } from "@/components/admin/LanguageToggle"
import { Save } from "lucide-react"

export default function YourStoriesEdit() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>('ua')
  const [formData, setFormData] = useState({
    // UA Fields
    bannerTitle_ua: '',
    bannerSubtitle_ua: '',
    searchPlaceholder_ua: '',
    formTitle_ua: '',
    formSubtitle_ua: '',
    formButtonText_ua: '',
    
    // EN Fields
    bannerTitle_en: '',
    bannerSubtitle_en: '',
    searchPlaceholder_en: '',
    formTitle_en: '',
    formSubtitle_en: '',
    formButtonText_en: '',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/your-stories-settings')
        if (response.ok) {
          const data = await response.json()
          setFormData({
            bannerTitle_ua: data.bannerTitle_ua || '',
            bannerSubtitle_ua: data.bannerSubtitle_ua || '',
            searchPlaceholder_ua: data.searchPlaceholder_ua || '',
            formTitle_ua: data.formTitle_ua || '',
            formSubtitle_ua: data.formSubtitle_ua || '',
            formButtonText_ua: data.formButtonText_ua || '',
            bannerTitle_en: data.bannerTitle_en || '',
            bannerSubtitle_en: data.bannerSubtitle_en || '',
            searchPlaceholder_en: data.searchPlaceholder_en || '',
            formTitle_en: data.formTitle_en || '',
            formSubtitle_en: data.formSubtitle_en || '',
            formButtonText_en: data.formButtonText_en || '',
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
      const response = await fetch('/api/your-stories-settings', {
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
        <h1 className="text-3xl font-bold">Редактирование страницы "Ваши истории"</h1>
        <p className="text-muted-foreground">
          Управление контентом страницы с историями героев
        </p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Изменения успешно сохранены!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Language Toggle */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Редактирование страницы "Ваши истории"</h2>
            <p className="text-muted-foreground">Выберите язык для редактирования</p>
          </div>
          <LanguageToggle currentLang={currentLang} onChange={setCurrentLang} />
        </div>

        {/* Banner Section */}
        <Card>
          <CardHeader>
            <CardTitle>Баннер страницы</CardTitle>
            <CardDescription>Заголовок и описание в верхней части</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bannerTitle">Заголовок ({currentLang.toUpperCase()})</Label>
              <Input
                id="bannerTitle"
                value={formData[`bannerTitle_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`bannerTitle_${currentLang}`]: e.target.value })}
                placeholder={currentLang === 'ua' ? "ВАШІ ІСТОРІЇ" : "YOUR STORIES"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bannerSubtitle">Подзаголовок ({currentLang.toUpperCase()})</Label>
              <Textarea
                id="bannerSubtitle"
                value={formData[`bannerSubtitle_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`bannerSubtitle_${currentLang}`]: e.target.value })}
                rows={3}
                placeholder={currentLang === 'ua' 
                  ? "Ми створюємо місце, де на стінах з'являються портрети загиблих військових."
                  : "We create a place where portraits of fallen soldiers appear on the walls."}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="searchPlaceholder">Текст в поиске (placeholder) ({currentLang.toUpperCase()})</Label>
              <Input
                id="searchPlaceholder"
                value={formData[`searchPlaceholder_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`searchPlaceholder_${currentLang}`]: e.target.value })}
                placeholder={currentLang === 'ua' ? "Позивний/ПІБ" : "Call Sign/Name"}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Block Section */}
        <Card>
          <CardHeader>
            <CardTitle>Блок призыва к действию</CardTitle>
            <CardDescription>Текст и кнопка для отправки истории</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="formTitle">Заголовок ({currentLang.toUpperCase()})</Label>
              <Textarea
                id="formTitle"
                value={formData[`formTitle_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`formTitle_${currentLang}`]: e.target.value })}
                rows={2}
                placeholder={currentLang === 'ua' 
                  ? "у кожного — свій захисник, своя історія"
                  : "everyone has their own protector, their own story"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formSubtitle">Подзаголовок ({currentLang.toUpperCase()})</Label>
              <Input
                id="formSubtitle"
                value={formData[`formSubtitle_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`formSubtitle_${currentLang}`]: e.target.value })}
                placeholder={currentLang === 'ua' 
                  ? "Поділись історією свого героя"
                  : "Share your hero's story"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="formButtonText">Текст кнопки ({currentLang.toUpperCase()})</Label>
              <Input
                id="formButtonText"
                value={formData[`formButtonText_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`formButtonText_${currentLang}`]: e.target.value })}
                placeholder={currentLang === 'ua' ? "Заповнити форму" : "Fill out the form"}
              />
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

