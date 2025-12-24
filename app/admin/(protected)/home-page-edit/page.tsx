"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, Eye, EyeOff, Plus, Edit, Trash2, MoveUp, MoveDown } from "lucide-react"

interface HeroSlide {
  id: string
  imageUrl: string
  callSign: string
  link?: string
  order: number
}

interface GallerySlide {
  id: string
  imageUrl: string
  caption: string
  order: number
}

export default function HomePageEdit() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([])
  const [gallerySlides, setGallerySlides] = useState<GallerySlide[]>([])
  const [formData, setFormData] = useState({
    // Hero Banner
    heroTitle: '',
    heroSubtitle: '',
    heroDescription: '',
    heroVideoUrl: '',
    
    // About Section
    aboutLabel: '',
    aboutTitle: '',
    aboutText1: '',
    aboutText2: '',
    
    // Heroes Slider
    heroesTitle: '',
    heroesSubtitle: '',
    showHeroesSlider: true,
    
    // Stone Block
    stoneTitle: '',
    stoneQuote: '',
    stoneImageUrl: '',
    showStoneBlock: true,
    
    // Gallery
    galleryTitle: '',
    gallerySubtitle: '',
    showGallery: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch home settings
        const settingsRes = await fetch('/api/home-settings')
        if (settingsRes.ok) {
          const data = await settingsRes.json()
          setFormData({
            heroTitle: data.heroTitle || '',
            heroSubtitle: data.heroSubtitle || '',
            heroDescription: data.heroDescription || '',
            heroVideoUrl: data.heroVideoUrl || '',
            aboutLabel: data.aboutLabel || '',
            aboutTitle: data.aboutTitle || '',
            aboutText1: data.aboutText1 || '',
            aboutText2: data.aboutText2 || '',
            heroesTitle: data.heroesTitle || '',
            heroesSubtitle: data.heroesSubtitle || '',
            showHeroesSlider: data.showHeroesSlider ?? true,
            stoneTitle: data.stoneTitle || '',
            stoneQuote: data.stoneQuote || '',
            stoneImageUrl: data.stoneImageUrl || '',
            showStoneBlock: data.showStoneBlock ?? true,
            galleryTitle: data.galleryTitle || '',
            gallerySubtitle: data.gallerySubtitle || '',
            showGallery: data.showGallery ?? true,
          })
        }

        // Fetch hero slides
        const heroSlidesRes = await fetch('/api/sliders/heroes')
        if (heroSlidesRes.ok) {
          const heroData = await heroSlidesRes.json()
          setHeroSlides(heroData)
        }

        // Fetch gallery slides
        const gallerySlidesRes = await fetch('/api/sliders/gallery')
        if (gallerySlidesRes.ok) {
          const galleryData = await gallerySlidesRes.json()
          setGallerySlides(galleryData)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setFetching(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/home-settings', {
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

  // Hero Slide Management
  const handleAddHeroSlide = async () => {
    const imageUrl = prompt('URL изображения:')
    if (!imageUrl) return
    
    const callSign = prompt('Позывной:')
    if (!callSign) return
    
    const link = prompt('Ссылка (необязательно):') || undefined

    try {
      const response = await fetch('/api/sliders/heroes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, callSign, link, order: heroSlides.length }),
      })

      if (response.ok) {
        const newSlide = await response.json()
        setHeroSlides([...heroSlides, newSlide])
      }
    } catch (error) {
      console.error('Error adding hero slide:', error)
    }
  }

  const handleDeleteHeroSlide = async (id: string) => {
    if (!confirm('Удалить этот элемент?')) return

    try {
      const response = await fetch(`/api/sliders/heroes/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setHeroSlides(heroSlides.filter(slide => slide.id !== id))
      }
    } catch (error) {
      console.error('Error deleting hero slide:', error)
    }
  }

  const handleMoveHeroSlide = async (id: string, direction: 'up' | 'down') => {
    const index = heroSlides.findIndex(s => s.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === heroSlides.length - 1)) return

    const newSlides = [...heroSlides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]]
    
    // Update orders
    newSlides[index].order = index
    newSlides[targetIndex].order = targetIndex

    setHeroSlides(newSlides)

    // Update on server
    try {
      await Promise.all([
        fetch(`/api/sliders/heroes/${newSlides[index].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: index }),
        }),
        fetch(`/api/sliders/heroes/${newSlides[targetIndex].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: targetIndex }),
        }),
      ])
    } catch (error) {
      console.error('Error updating hero slide order:', error)
    }
  }

  // Gallery Slide Management
  const handleAddGallerySlide = async () => {
    const imageUrl = prompt('URL изображения:')
    if (!imageUrl) return
    
    const caption = prompt('Подпись:')
    if (!caption) return

    try {
      const response = await fetch('/api/sliders/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl, caption, order: gallerySlides.length }),
      })

      if (response.ok) {
        const newSlide = await response.json()
        setGallerySlides([...gallerySlides, newSlide])
      }
    } catch (error) {
      console.error('Error adding gallery slide:', error)
    }
  }

  const handleDeleteGallerySlide = async (id: string) => {
    if (!confirm('Удалить этот элемент?')) return

    try {
      const response = await fetch(`/api/sliders/gallery/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setGallerySlides(gallerySlides.filter(slide => slide.id !== id))
      }
    } catch (error) {
      console.error('Error deleting gallery slide:', error)
    }
  }

  const handleMoveGallerySlide = async (id: string, direction: 'up' | 'down') => {
    const index = gallerySlides.findIndex(s => s.id === id)
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === gallerySlides.length - 1)) return

    const newSlides = [...gallerySlides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    ;[newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]]
    
    // Update orders
    newSlides[index].order = index
    newSlides[targetIndex].order = targetIndex

    setGallerySlides(newSlides)

    // Update on server
    try {
      await Promise.all([
        fetch(`/api/sliders/gallery/${newSlides[index].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: index }),
        }),
        fetch(`/api/sliders/gallery/${newSlides[targetIndex].id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ order: targetIndex }),
        }),
      ])
    } catch (error) {
      console.error('Error updating gallery slide order:', error)
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
        <h1 className="text-3xl font-bold">Редактирование главной страницы</h1>
        <p className="text-muted-foreground">
          Управление всеми блоками главной страницы в одном месте
        </p>
      </div>

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          Изменения успешно сохранены!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Banner Section */}
        <Card>
          <CardHeader>
            <CardTitle>Главный баннер (Hero)</CardTitle>
            <CardDescription>Верхний блок с видео-фоном</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Заголовок</Label>
                <Input
                  id="heroTitle"
                  value={formData.heroTitle}
                  onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                  placeholder="Алея"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Подзаголовок</Label>
                <Input
                  id="heroSubtitle"
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  placeholder="Друзів"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroDescription">Описание</Label>
              <Input
                id="heroDescription"
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                placeholder="Тут ми пам'ятаємо не лише подвиги..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroVideoUrl">URL видео</Label>
              <Input
                id="heroVideoUrl"
                value={formData.heroVideoUrl}
                onChange={(e) => setFormData({ ...formData, heroVideoUrl: e.target.value })}
                placeholder="/video.mp4"
              />
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle>Блок "Про алею"</CardTitle>
            <CardDescription>Блок с 3D статуей и текстом о проекте</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="aboutLabel">Метка раздела</Label>
              <Input
                id="aboutLabel"
                value={formData.aboutLabel}
                onChange={(e) => setFormData({ ...formData, aboutLabel: e.target.value })}
                placeholder="Про алею"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutTitle">Заголовок</Label>
              <Textarea
                id="aboutTitle"
                value={formData.aboutTitle}
                onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                rows={2}
                placeholder="Тут — історії людей, які переписали історію країни"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutText1">Первый параграф</Label>
              <Textarea
                id="aboutText1"
                value={formData.aboutText1}
                onChange={(e) => setFormData({ ...formData, aboutText1: e.target.value })}
                rows={4}
                placeholder="Ми хочемо, щоб про них пам'ятали..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aboutText2">Второй параграф (в цитате)</Label>
              <Textarea
                id="aboutText2"
                value={formData.aboutText2}
                onChange={(e) => setFormData({ ...formData, aboutText2: e.target.value })}
                rows={4}
                placeholder="Вони своїми вчинками переписали історію..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Heroes Slider Section */}
        <Card>
          <CardHeader>
            <CardTitle>Слайдер героев</CardTitle>
            <CardDescription>Карусель с героями</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Показывать слайдер</div>
                <div className="text-sm text-muted-foreground">
                  {formData.showHeroesSlider ? 'Блок отображается' : 'Блок скрыт'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, showHeroesSlider: !formData.showHeroesSlider })}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-background border"
              >
                {formData.showHeroesSlider ? (
                  <><Eye className="h-4 w-4" /> Показан</>
                ) : (
                  <><EyeOff className="h-4 w-4" /> Скрыт</>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heroesTitle">Заголовок</Label>
                <Input
                  id="heroesTitle"
                  value={formData.heroesTitle}
                  onChange={(e) => setFormData({ ...formData, heroesTitle: e.target.value })}
                  placeholder="Наші герої"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroesSubtitle">Подзаголовок</Label>
                <Input
                  id="heroesSubtitle"
                  value={formData.heroesSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroesSubtitle: e.target.value })}
                  placeholder="Пам'ятаємо кожного"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stone Block Section */}
        <Card>
          <CardHeader>
            <CardTitle>Блок с цитатой (Stone Block)</CardTitle>
            <CardDescription>Блок с фоном и текстом</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Показывать блок</div>
                <div className="text-sm text-muted-foreground">
                  {formData.showStoneBlock ? 'Блок отображается' : 'Блок скрыт'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, showStoneBlock: !formData.showStoneBlock })}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-background border"
              >
                {formData.showStoneBlock ? (
                  <><Eye className="h-4 w-4" /> Показан</>
                ) : (
                  <><EyeOff className="h-4 w-4" /> Скрыт</>
                )}
              </button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stoneTitle">Заголовок</Label>
              <Textarea
                id="stoneTitle"
                value={formData.stoneTitle}
                onChange={(e) => setFormData({ ...formData, stoneTitle: e.target.value })}
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stoneQuote">Цитата</Label>
              <Textarea
                id="stoneQuote"
                value={formData.stoneQuote}
                onChange={(e) => setFormData({ ...formData, stoneQuote: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stoneImageUrl">URL изображения фона</Label>
              <Input
                id="stoneImageUrl"
                value={formData.stoneImageUrl}
                onChange={(e) => setFormData({ ...formData, stoneImageUrl: e.target.value })}
                placeholder="/image.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Gallery Section */}
        <Card>
          <CardHeader>
            <CardTitle>Галерея</CardTitle>
            <CardDescription>Блок с фотографиями</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <div className="font-medium">Показывать галерею</div>
                <div className="text-sm text-muted-foreground">
                  {formData.showGallery ? 'Блок отображается' : 'Блок скрыт'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, showGallery: !formData.showGallery })}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-background border"
              >
                {formData.showGallery ? (
                  <><Eye className="h-4 w-4" /> Показана</>
                ) : (
                  <><EyeOff className="h-4 w-4" /> Скрыта</>
                )}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="galleryTitle">Заголовок</Label>
                <Input
                  id="galleryTitle"
                  value={formData.galleryTitle}
                  onChange={(e) => setFormData({ ...formData, galleryTitle: e.target.value })}
                  placeholder="Галерея"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gallerySubtitle">Подзаголовок</Label>
                <Input
                  id="gallerySubtitle"
                  value={formData.gallerySubtitle}
                  onChange={(e) => setFormData({ ...formData, gallerySubtitle: e.target.value })}
                  placeholder="Фото з заходів"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hero Slider Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Элементы слайдера героев</span>
              <Button type="button" onClick={handleAddHeroSlide} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Добавить элемент
              </Button>
            </CardTitle>
            <CardDescription>Фото + позывной + ссылка (необязательно)</CardDescription>
          </CardHeader>
          <CardContent>
            {heroSlides.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Нет элементов. Нажмите "Добавить элемент" для создания.
              </div>
            ) : (
              <div className="space-y-3">
                {heroSlides.map((slide, index) => (
                  <div key={slide.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                    <img src={slide.imageUrl} alt={slide.callSign} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="font-medium">{slide.callSign}</div>
                      {slide.link && (
                        <a href={slide.link} className="text-xs text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          {slide.link}
                        </a>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveHeroSlide(slide.id, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveHeroSlide(slide.id, 'down')}
                        disabled={index === heroSlides.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteHeroSlide(slide.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Gallery Slider Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Элементы слайдера галереи</span>
              <Button type="button" onClick={handleAddGallerySlide} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Добавить элемент
              </Button>
            </CardTitle>
            <CardDescription>Фото + подпись</CardDescription>
          </CardHeader>
          <CardContent>
            {gallerySlides.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Нет элементов. Нажмите "Добавить элемент" для создания.
              </div>
            ) : (
              <div className="space-y-3">
                {gallerySlides.map((slide, index) => (
                  <div key={slide.id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                    <img src={slide.imageUrl} alt={slide.caption} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <div className="text-sm">{slide.caption}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveGallerySlide(slide.id, 'up')}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveGallerySlide(slide.id, 'down')}
                        disabled={index === gallerySlides.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGallerySlide(slide.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex gap-4 sticky bottom-4 bg-background p-4 border rounded-lg shadow-lg">
          <Button type="submit" disabled={loading} size="lg" className="flex-1">
            <Save className="mr-2 h-5 w-5" />
            {loading ? 'Сохранение...' : 'Сохранить все изменения'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin')}
            size="lg"
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  )
}

