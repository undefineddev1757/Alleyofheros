"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  aspectRatio?: string
  description?: string
}

export function ImageUpload({ 
  label, 
  value, 
  onChange, 
  aspectRatio,
  description 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, выберите изображение",
      })
      return
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Размер файла не должен превышать 10MB",
      })
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        onChange(data.url)
        toast({
          title: "Успешно",
          description: "Изображение загружено",
        })
      } else {
        const error = await response.json()
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.error || "Не удалось загрузить файл",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при загрузке",
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = () => {
    onChange('')
    setShowUrlInput(false)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      
      {value ? (
        <div className="space-y-2">
          <div className="relative inline-block">
            <img
              src={value}
              alt="Preview"
              className="max-w-full h-auto rounded border"
              style={{ 
                maxHeight: aspectRatio === '1440x800' ? '200px' : '150px',
                objectFit: 'contain'
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-muted-foreground break-all">
            {value}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Загрузка...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Загрузить файл
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUrlInput(!showUrlInput)}
            >
              {showUrlInput ? 'Отмена' : 'Вставить URL'}
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {showUrlInput && (
            <Input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          )}
        </div>
      )}
    </div>
  )
}


