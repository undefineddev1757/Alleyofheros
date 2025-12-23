"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

interface Submission {
  id: string
  type: string
  name: string
  email?: string
  phone?: string
  heroName?: string
  heroStory?: string
  message?: string
  imageUrl?: string
  status: string
  createdAt: string
}

export default function SubmissionDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [submission, setSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await fetch(`/api/submissions/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setSubmission(data)
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
      }
    } catch (error) {
      console.error("Error updating submission:", error)
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
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm text-muted-foreground">Тип заявки</div>
              <div className="font-medium">{submission.type}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Имя отправителя</div>
              <div className="font-medium">{submission.name}</div>
            </div>
            {submission.email && (
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">{submission.email}</div>
              </div>
            )}
            {submission.phone && (
              <div>
                <div className="text-sm text-muted-foreground">Телефон</div>
                <div className="font-medium">{submission.phone}</div>
              </div>
            )}
            {submission.heroName && (
              <div>
                <div className="text-sm text-muted-foreground">Имя героя</div>
                <div className="font-medium">{submission.heroName}</div>
              </div>
            )}
            {submission.heroStory && (
              <div>
                <div className="text-sm text-muted-foreground">История</div>
                <div className="whitespace-pre-wrap">{submission.heroStory}</div>
              </div>
            )}
            {submission.message && (
              <div>
                <div className="text-sm text-muted-foreground">Сообщение</div>
                <div className="whitespace-pre-wrap">{submission.message}</div>
              </div>
            )}
            {submission.imageUrl && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">Изображение</div>
                <img 
                  src={submission.imageUrl} 
                  alt="Submission" 
                  className="max-w-md rounded-lg"
                />
              </div>
            )}
            <div>
              <div className="text-sm text-muted-foreground">Дата подачи</div>
              <div className="font-medium">
                {new Date(submission.createdAt).toLocaleString("ru-RU")}
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
              <div className="font-medium capitalize">{submission.status}</div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

