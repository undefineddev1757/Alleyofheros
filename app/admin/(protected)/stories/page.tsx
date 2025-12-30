"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import { DeleteStoryButton } from "./DeleteStoryButton"
import { ToggleStoryButton } from "./ToggleStoryButton"
import { useToast } from "@/hooks/use-toast"

interface Story {
  id: string
  heroName: string
  heroStory: string
  isActive: boolean
  createdAt: Date
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [selectedStories, setSelectedStories] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories?all=true')
      if (response.ok) {
        const data = await response.json()
        setStories(data)
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить список историй"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStories(new Set(stories.map(s => s.id)))
    } else {
      setSelectedStories(new Set())
    }
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedStories)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedStories(newSelected)
  }

  const handleBulkDelete = async () => {
    if (selectedStories.size === 0) return

    try {
      const deletePromises = Array.from(selectedStories).map(id =>
        fetch(`/api/stories/${id}`, { method: 'DELETE' })
      )

      await Promise.all(deletePromises)

      toast({
        title: "Успешно удалено",
        description: `Удалено историй: ${selectedStories.size}`
      })

      setSelectedStories(new Set())
      setDeleteDialogOpen(false)
      fetchStories()
    } catch (error) {
      console.error('Error deleting stories:', error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить истории"
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление историями</h1>
          <p className="text-muted-foreground">
            Создавайте и редактируйте истории героев для страницы "Ваши истории"
          </p>
        </div>
        <div className="flex gap-2">
          {selectedStories.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить выбранные ({selectedStories.size})
            </Button>
          )}
        <Link href="/admin/stories/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить историю
          </Button>
        </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список историй ({stories.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedStories.size === stories.length && stories.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Имя героя</TableHead>
                <TableHead>История</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    <div className="flex flex-col items-center gap-2">
                      <p>Нет историй</p>
                      <Link href="/admin/stories/new">
                        <Button variant="outline" size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Создать первую историю
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                stories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedStories.has(story.id)}
                        onCheckedChange={(checked) => 
                          handleSelectOne(story.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{story.heroName}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {story.heroStory.substring(0, 100)}
                      {story.heroStory.length > 100 && '...'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={story.isActive ? "default" : "secondary"}>
                        {story.isActive ? (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            Показано
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <EyeOff className="h-3 w-3" />
                            Скрыто
                          </span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(story.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <ToggleStoryButton 
                          id={story.id} 
                          isActive={story.isActive}
                          onToggled={fetchStories}
                        />
                        <Link href={`/admin/stories/${story.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        </Link>
                        <DeleteStoryButton 
                          id={story.id} 
                          heroName={story.heroName}
                          onDeleted={fetchStories}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить {selectedStories.size} {
                selectedStories.size === 1 ? 'историю' : 
                selectedStories.size < 5 ? 'истории' : 'историй'
              }?
              <br />
              <strong>Это действие нельзя отменить.</strong>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
