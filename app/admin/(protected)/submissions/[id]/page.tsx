"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface Submission {
  id: string
  type: string
  name: string
  email?: string
  phone?: string
  telegramUsername?: string
  heroName?: string
  residence?: string
  birthDate?: string
  deathDate?: string
  heroStory?: string
  message?: string
  imageUrl?: string
  mediaFiles?: string[]
  status: string
  createdAt: string
}

export default function SubmissionDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [submission, setSubmission] = useState<Submission | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`/api/submissions/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          
          // Parse old format data from heroStory if new fields are empty
          if (!data.residence && !data.birthDate && !data.deathDate && data.heroStory) {
            const storyLines = data.heroStory.split('\n')
            const parsed: any = { ...data }
            
            storyLines.forEach((line: string) => {
              if (line.startsWith('Місце проживання:')) {
                parsed.residence = line.replace('Місце проживання:', '').trim()
              } else if (line.startsWith('Дата народження:')) {
                parsed.birthDate = line.replace('Дата народження:', '').trim()
              } else if (line.startsWith('Дата смерті:')) {
                parsed.deathDate = line.replace('Дата смерті:', '').trim()
              }
            })
            
            // Remove parsed data from heroStory
            if (parsed.residence || parsed.birthDate || parsed.deathDate) {
              const storyStart = storyLines.findIndex((line: string) => 
                !line.startsWith('Місце проживання:') && 
                !line.startsWith('Дата народження:') && 
                !line.startsWith('Дата смерті:') && 
                line.trim() !== ''
              )
              if (storyStart !== -1) {
                parsed.heroStory = storyLines.slice(storyStart).join('\n')
              }
            }
            
            setSubmission(parsed)
          } else {
            setSubmission(data)
          }
        }
      } catch (error) {
        console.error("Error fetching submission:", error)
      } finally {
        setFetching(false)
      }
    }

    fetchSubmission()
  }, [params.id])

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/submissions/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updated = await response.json()
        setSubmission(updated)
        toast({
          title: "Успешно",
          description: "Статус успешно обновлен",
        })
      }
    } catch (error) {
      console.error("Error updating submission:", error)
      toast({
        title: "Ошибка",
        description: "Ошибка при обновлении статуса",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Удалить эту заявку? Это действие необратимо.")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/submissions/${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Заявка успешно удалена",
        })
        router.push("/admin/submissions")
      } else {
        toast({
          title: "Ошибка",
          description: "Ошибка при удалении заявки",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting submission:", error)
      toast({
        title: "Ошибка",
        description: "Ошибка сети",
        variant: "destructive",
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

  if (!submission) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Заявка не найдена</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/submissions">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Детали заявки</h1>
          <p className="text-muted-foreground">
            Просмотр и управление заявкой
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Информация о заявке</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 overflow-hidden">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Тип заявки</div>
                <div className="text-base break-words">{submission.type === 'hero-submission' ? 'Додати героя' : submission.type}</div>
              </div>
              {submission.heroName && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Имя героя</div>
                    <div className="text-base font-semibold break-words">{submission.heroName}</div>
                  </div>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Контактная информация</h3>
              <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-muted-foreground mb-1">Имя отправителя</div>
                <div className="text-base break-words">{submission.name}</div>
              </div>
                {submission.phone && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Телефон</div>
                    <div className="text-base break-words">{submission.phone}</div>
                  </div>
                )}
                {(submission.telegramUsername || submission.email) && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">
                      {submission.telegramUsername ? 'Telegram' : 'Email/Telegram'}
                    </div>
                    <div className="text-base break-words">
                      {submission.telegramUsername || submission.email}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(submission.residence || submission.birthDate || submission.deathDate) && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Данные героя</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {submission.residence && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Місце проживання</div>
                      <div className="text-base break-words">{submission.residence}</div>
                    </div>
                  )}
                  {submission.birthDate && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Дата народження</div>
                      <div className="text-base break-words">{submission.birthDate}</div>
                    </div>
                  )}
                  {submission.deathDate && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Дата смерті</div>
                      <div className="text-base break-words">{submission.deathDate}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {submission.heroStory && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">История</h3>
                <div className="text-base whitespace-pre-wrap bg-muted/30 p-4 rounded-lg break-words overflow-wrap-anywhere">
                  {submission.heroStory}
                </div>
              </div>
            )}

            {submission.message && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">Сообщение</h3>
                <div className="text-base whitespace-pre-wrap bg-muted/30 p-4 rounded-lg break-words overflow-wrap-anywhere">
                  {submission.message}
                </div>
              </div>
            )}

            {((submission.mediaFiles && submission.mediaFiles.length > 0) || submission.imageUrl) && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-3">
                  Медиафайлы
                  {submission.mediaFiles && submission.mediaFiles.length > 0 && ` (${submission.mediaFiles.length})`}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {submission.mediaFiles && submission.mediaFiles.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`Фото ${index + 1}`}
                        className="w-full h-40 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                      />
                      <a 
                        href={url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                      >
                        <span className="text-white text-sm font-medium">Открыть</span>
                      </a>
                    </div>
                  ))}
                  {submission.imageUrl && (
                    <div className="relative group">
                      <img 
                        src={submission.imageUrl} 
                        alt="Фото"
                        className="w-full h-40 object-cover rounded-lg shadow-md transition-transform group-hover:scale-105"
                      />
                      <a 
                        href={submission.imageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                      >
                        <span className="text-white text-sm font-medium">Открыть</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="text-sm font-medium text-muted-foreground mb-1">Дата подачи</div>
              <div className="text-base break-words">
                {new Date(submission.createdAt).toLocaleString("ru-RU", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Управление</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Текущий статус</div>
              <div className="font-medium">
                {submission.status === 'pending' && 'Pending'}
                {submission.status === 'approved' && 'Одобрено'}
                {submission.status === 'rejected' && 'Отклонено'}
              </div>
            </div>
            <div className="space-y-2">
              <Button
                onClick={() => handleStatusChange("approved")}
                disabled={loading || submission.status === "approved"}
                className="w-full"
                variant={submission.status === "approved" ? "default" : "outline"}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Одобрить
              </Button>
              <Button
                onClick={() => handleStatusChange("rejected")}
                disabled={loading || submission.status === "rejected"}
                className="w-full"
                variant={submission.status === "rejected" ? "destructive" : "outline"}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Отклонить
              </Button>
              <Button
                onClick={() => handleStatusChange("pending")}
                disabled={loading || submission.status === "pending"}
                className="w-full"
                variant="outline"
              >
                Вернуть в ожидание
              </Button>
            </div>
            <div className="pt-4 border-t">
              <Button
                onClick={handleDelete}
                disabled={loading}
                className="w-full"
                variant="destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Удалить заявку
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

