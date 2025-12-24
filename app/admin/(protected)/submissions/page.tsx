"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Eye, CheckCircle, XCircle, Clock, Search, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/toast"

export default function SubmissionsManagement() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleting, setDeleting] = useState(false)
  const { showToast } = useToast()

  const fetchSubmissions = () => {
    fetch("/api/submissions")
      .then(res => res.json())
      .then(data => {
        setSubmissions(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Одобрено"
      case "rejected":
        return "Отклонено"
      default:
        return "В ожидании"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "hero-submission":
        return "Добавление героя"
      case "story-submission":
        return "История"
      case "contact":
        return "Обратная связь"
      default:
        return type
    }
  }

  const filteredSubmissions = submissions.filter(submission =>
    submission.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredSubmissions.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredSubmissions.map(s => s.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить эту заявку?")) return

    try {
      const response = await fetch(`/api/submissions/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        showToast("success", "Заявка успешно удалена")
        fetchSubmissions()
      } else {
        showToast("error", "Ошибка при удалении заявки")
      }
    } catch (error) {
      showToast("error", "Ошибка сети")
    }
  }

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return
    if (!confirm(`Удалить выбранные заявки (${selectedIds.length})?`)) return

    setDeleting(true)
    try {
      const promises = selectedIds.map(id =>
        fetch(`/api/submissions/${id}`, { method: "DELETE" })
      )
      
      await Promise.all(promises)
      showToast("success", `Удалено заявок: ${selectedIds.length}`)
      setSelectedIds([])
      fetchSubmissions()
    } catch (error) {
      showToast("error", "Ошибка при удалении заявок")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Заявки</h1>
          <p className="text-muted-foreground">
            Управление заявками от пользователей
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Поиск по имени..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {selectedIds.length > 0 && (
          <Button
            variant="destructive"
            onClick={handleDeleteSelected}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Удалить выбранные ({selectedIds.length})
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>В ожидании</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredSubmissions.filter(s => s.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Одобрено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {filteredSubmissions.filter(s => s.status === "approved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Отклонено</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {filteredSubmissions.filter(s => s.status === "rejected").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Все заявки</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    checked={filteredSubmissions.length > 0 && selectedIds.length === filteredSubmissions.length}
                    onChange={toggleSelectAll}
                    className="cursor-pointer"
                  />
                </TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    {searchQuery ? "Ничего не найдено" : "Нет заявок"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(submission.id)}
                        onChange={() => toggleSelect(submission.id)}
                        className="cursor-pointer"
                      />
                    </TableCell>
                    <TableCell>{getTypeText(submission.type)}</TableCell>
                    <TableCell className="font-medium">{submission.name}</TableCell>
                    <TableCell>{submission.phone || "—"}</TableCell>
                    <TableCell>
                      {new Date(submission.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(submission.status)}
                        <span>{getStatusText(submission.status)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/submissions/${submission.id}`}>
                          <Button variant="ghost" size="icon" title="Просмотр">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(submission.id)}
                          title="Удалить"
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

