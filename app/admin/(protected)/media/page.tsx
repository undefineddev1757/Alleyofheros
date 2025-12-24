"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/toast"
import { Upload, Search, Trash2, Copy, Check, Image as ImageIcon, File, Video } from "lucide-react"

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  createdBy: string
  createdAt: string
}

export default function MediaPage() {
  const { addToast } = useToast()
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 })

  useEffect(() => {
    fetchFiles()
  }, [search])

  const fetchFiles = async () => {
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      
      const response = await fetch(`/api/media?${params}`)
      if (response.ok) {
        const data = await response.json()
        setFiles(data)
      }
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles || selectedFiles.length === 0) return

    // Проверка размера файлов
    const oversizedFiles = Array.from(selectedFiles).filter(
      f => f.size > 100 * 1024 * 1024
    )
    if (oversizedFiles.length > 0) {
      addToast({
        variant: "error",
        title: "Файлы слишком большие",
        description: `Следующие файлы превышают лимит 100МБ:\n${oversizedFiles.map(f => f.name).join(', ')}`,
        duration: 7000,
      })
      return
    }

    setUploading(true)
    setUploadProgress({ current: 0, total: selectedFiles.length })
    const uploadedFiles: MediaFile[] = []
    const failedFiles: string[] = []

    // Загружаем файлы по одному
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      setUploadProgress({ current: i + 1, total: selectedFiles.length })
      
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const newFile = await response.json()
          uploadedFiles.push(newFile)
        } else {
          const error = await response.json()
          failedFiles.push(`${file.name}: ${error.error || 'неизвестная ошибка'}`)
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        failedFiles.push(`${file.name}: ошибка сети`)
      }
    }

    // Обновляем список файлов
    if (uploadedFiles.length > 0) {
      setFiles([...uploadedFiles, ...files])
    }

    // Показываем результаты
    if (failedFiles.length > 0) {
      addToast({
        variant: "warning",
        title: `Загружено: ${uploadedFiles.length} из ${selectedFiles.length}`,
        description: `Ошибки: ${failedFiles.slice(0, 3).join(', ')}${failedFiles.length > 3 ? ` и еще ${failedFiles.length - 3}...` : ''}`,
        duration: 7000,
      })
    } else {
      addToast({
        variant: "success",
        title: "Загрузка завершена",
        description: `Успешно загружено ${uploadedFiles.length} файлов`,
      })
    }

    setUploading(false)
    e.target.value = ''
  }

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm('Удалить этот файл?')) return

    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setFiles(files.filter(f => f.id !== id))
        addToast({
          variant: "success",
          title: "Файл удален",
          description: filename,
        })
      } else {
        addToast({
          variant: "error",
          title: "Ошибка удаления",
          description: "Не удалось удалить файл",
        })
      }
    } catch (error) {
      console.error('Error deleting file:', error)
      addToast({
        variant: "error",
        title: "Ошибка",
        description: "Произошла ошибка при удалении файла",
      })
    }
  }

  const copyToClipboard = (url: string, id: string) => {
    const fullUrl = `${window.location.origin}${url}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
    addToast({
      variant: "success",
      title: "Скопировано",
      description: "URL файла скопирован в буфер обмена",
      duration: 2000,
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = e.dataTransfer.files
    if (!droppedFiles || droppedFiles.length === 0) return

    // Проверка размера файлов
    const oversizedFiles = Array.from(droppedFiles).filter(
      f => f.size > 100 * 1024 * 1024
    )
    if (oversizedFiles.length > 0) {
      addToast({
        variant: "error",
        title: "Файлы слишком большие",
        description: `Следующие файлы превышают лимит 100МБ:\n${oversizedFiles.map(f => f.name).join(', ')}`,
        duration: 7000,
      })
      return
    }

    setUploading(true)
    setUploadProgress({ current: 0, total: droppedFiles.length })
    const uploadedFiles: MediaFile[] = []
    const failedFiles: string[] = []

    // Загружаем файлы по одному
    for (let i = 0; i < droppedFiles.length; i++) {
      const file = droppedFiles[i]
      setUploadProgress({ current: i + 1, total: droppedFiles.length })
      
      try {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/media/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const newFile = await response.json()
          uploadedFiles.push(newFile)
        } else {
          const error = await response.json()
          failedFiles.push(`${file.name}: ${error.error || 'неизвестная ошибка'}`)
        }
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        failedFiles.push(`${file.name}: ошибка сети`)
      }
    }

    // Обновляем список файлов
    if (uploadedFiles.length > 0) {
      setFiles([...uploadedFiles, ...files])
    }

    // Показываем результаты
    if (failedFiles.length > 0) {
      addToast({
        variant: "warning",
        title: `Загружено: ${uploadedFiles.length} из ${droppedFiles.length}`,
        description: `Ошибки: ${failedFiles.slice(0, 3).join(', ')}${failedFiles.length > 3 ? ` и еще ${failedFiles.length - 3}...` : ''}`,
        duration: 7000,
      })
    } else {
      addToast({
        variant: "success",
        title: "Загрузка завершена",
        description: `Успешно загружено ${uploadedFiles.length} файлов`,
      })
    }

    setUploading(false)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <ImageIcon className="h-5 w-5" />
    if (mimeType.startsWith('video/')) return <Video className="h-5 w-5" />
    return <File className="h-5 w-5" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Медиафайлы</h1>
        <p className="text-muted-foreground">
          Управление изображениями, видео и другими файлами (до 100МБ)
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Загрузка файлов</CardTitle>
          <CardDescription>Максимальный размер файла: 100МБ</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="flex items-center gap-4"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <label className="flex-1">
              <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                uploading ? 'opacity-50' : dragActive ? 'border-primary bg-primary/5' : 'hover:border-primary'
              }`}>
                {uploading ? (
                  <div className="space-y-3">
                    <div className="text-muted-foreground">
                      Загрузка {uploadProgress.current} из {uploadProgress.total} файлов...
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      Нажмите для выбора файлов или перетащите их сюда
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Можно загрузить несколько файлов одновременно (до 100МБ каждый)
                    </div>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
                multiple
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar"
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Все файлы ({files.length})</CardTitle>
              <CardDescription>Список загруженных медиафайлов</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {files.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Нет загруженных файлов
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    {file.mimeType.startsWith('image/') ? (
                      <img
                        src={file.url}
                        alt={file.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : file.mimeType.startsWith('video/') ? (
                      <video
                        src={file.url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : (
                      <div className="text-muted-foreground">
                        {getFileIcon(file.mimeType)}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-medium truncate mb-1">
                      {file.originalName}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {formatFileSize(file.size)} • {new Date(file.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(file.url, file.id)}
                        className="flex-1"
                      >
                        {copiedId === file.id ? (
                          <><Check className="h-3 w-3 mr-1" /> Скопировано</>
                        ) : (
                          <><Copy className="h-3 w-3 mr-1" /> URL</>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(file.id, file.originalName)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

