"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LanguageToggle, Language } from "@/components/admin/LanguageToggle"
import { Save } from "lucide-react"

export default function FooterEdit() {
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [currentLang, setCurrentLang] = useState<Language>('ua')
  const [formData, setFormData] = useState({
    // UA Fields
    aboutText_ua: '',
    copyrightText_ua: '',
    
    // EN Fields
    aboutText_en: '',
    copyrightText_en: '',
    
    // Common Fields
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    telegramUrl: '',
    linkedinUrl: '',
  })

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/footer-settings')
        if (response.ok) {
          const data = await response.json()
          setFormData({
            aboutText_ua: data.aboutText_ua || '',
            copyrightText_ua: data.copyrightText_ua || '',
            aboutText_en: data.aboutText_en || '',
            copyrightText_en: data.copyrightText_en || '',
            facebookUrl: data.facebookUrl || '',
            instagramUrl: data.instagramUrl || '',
            twitterUrl: data.twitterUrl || '',
            youtubeUrl: data.youtubeUrl || '',
            telegramUrl: data.telegramUrl || '',
            linkedinUrl: data.linkedinUrl || '',
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
      const response = await fetch('/api/footer-settings', {
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
        <h1 className="text-3xl font-bold">Редактирование подвала (Footer)</h1>
        <p className="text-muted-foreground">
          Управление контактами и ссылками на соцсети в футере
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
            <h2 className="text-2xl font-bold">Редактирование подвала</h2>
            <p className="text-muted-foreground">Выберите язык для редактирования</p>
          </div>
          <LanguageToggle currentLang={currentLang} onChange={setCurrentLang} />
        </div>

        {/* Main Info */}
        <Card>
          <CardHeader>
            <CardTitle>Основная информация</CardTitle>
            <CardDescription>Текст и копирайт в футере</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutText">О проекте (текст в футере) ({currentLang.toUpperCase()})</Label>
              <Textarea
                id="aboutText"
                value={formData[`aboutText_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`aboutText_${currentLang}`]: e.target.value })}
                rows={4}
                placeholder={currentLang === 'ua' 
                  ? "Алея Друзів - проект, присвячений..." 
                  : "Avenue of Friends - a project dedicated to..."}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="copyrightText">Копирайт ({currentLang.toUpperCase()})</Label>
              <Input
                id="copyrightText"
                value={formData[`copyrightText_${currentLang}` as keyof typeof formData] as string}
                onChange={(e) => setFormData({ ...formData, [`copyrightText_${currentLang}`]: e.target.value })}
                placeholder={currentLang === 'ua' 
                  ? "© 2024 Алея Друзів. Всі права захищені." 
                  : "© 2024 Avenue of Friends. All rights reserved."}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Социальные сети</CardTitle>
            <CardDescription>Ссылки на страницы в соцсетях</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook</Label>
                <Input
                  id="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram</Label>
                <Input
                  id="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitterUrl">Twitter (X)</Label>
                <Input
                  id="twitterUrl"
                  value={formData.twitterUrl}
                  onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                  placeholder="https://twitter.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube</Label>
                <Input
                  id="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telegramUrl">Telegram</Label>
                <Input
                  id="telegramUrl"
                  value={formData.telegramUrl}
                  onChange={(e) => setFormData({ ...formData, telegramUrl: e.target.value })}
                  placeholder="https://t.me/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn</Label>
                <Input
                  id="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/..."
                />
              </div>
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

