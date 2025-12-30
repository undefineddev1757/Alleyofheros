"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { DeleteHeroButton } from "./DeleteHeroButton"
import { useToast } from "@/hooks/use-toast"

interface Hero {
  id: string
  name: string
  callSign: string
  description: string | null
  createdAt: Date
}

export default function HeroesPage() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([])
  const [selectedHeroes, setSelectedHeroes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const { toast } = useToast()

  useEffect(() => {
    fetchHeroes()
  }, [])

  useEffect(() => {
    filterHeroes()
  }, [heroes, searchQuery])

  const fetchHeroes = async () => {
    try {
      const response = await fetch('/api/heroes?limit=1000')
      if (response.ok) {
        const data = await response.json()
        setHeroes(data.heroes || [])
      }
    } catch (error) {
      console.error('Error fetching heroes:', error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить список героев"
      })
    } finally {
      setLoading(false)
    }
  }

  const filterHeroes = () => {
    if (!searchQuery.trim()) {
      setFilteredHeroes(heroes)
      setCurrentPage(1)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = heroes.filter(hero =>
      hero.name.toLowerCase().includes(query) ||
      hero.callSign.toLowerCase().includes(query)
    )
    setFilteredHeroes(filtered)
    setCurrentPage(1)
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHeroes(new Set(paginatedHeroes.map(h => h.id)))
    } else {
      setSelectedHeroes(new Set())
    }
  }

  // Pagination
  const totalPages = Math.ceil(filteredHeroes.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedHeroes = filteredHeroes.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedHeroes(new Set())
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1)
    setSelectedHeroes(new Set())
  }

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedHeroes)
    if (checked) {
      newSelected.add(id)
    } else {
      newSelected.delete(id)
    }
    setSelectedHeroes(newSelected)
  }

  const handleBulkDelete = async () => {
    if (selectedHeroes.size === 0) return

    try {
      const deletePromises = Array.from(selectedHeroes).map(id =>
        fetch(`/api/heroes/${id}`, { method: 'DELETE' })
      )

      await Promise.all(deletePromises)

      toast({
        title: "Успешно удалено",
        description: `Удалено героев: ${selectedHeroes.size}`
      })

      setSelectedHeroes(new Set())
      setDeleteDialogOpen(false)
      fetchHeroes()
    } catch (error) {
      console.error('Error deleting heroes:', error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось удалить героев"
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
          <h1 className="text-3xl font-bold">Управление героями</h1>
          <p className="text-muted-foreground">
            Список всех героев в системе
          </p>
        </div>
        <div className="flex gap-2">
          {selectedHeroes.size > 0 && (
            <Button
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Удалить выбранные ({selectedHeroes.size})
            </Button>
          )}
          <Link href="/admin/heroes/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Добавить героя
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Список героев ({filteredHeroes.length})</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени или позывному..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20">20 / страница</SelectItem>
                  <SelectItem value="50">50 / страница</SelectItem>
                  <SelectItem value="100">100 / страница</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedHeroes.size === paginatedHeroes.length && paginatedHeroes.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Имя</TableHead>
                <TableHead>Позывной</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedHeroes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    <div className="flex flex-col items-center gap-2">
                      {searchQuery ? (
                        <p>Ничего не найдено</p>
                      ) : (
                        <>
                          <p>Нет героев</p>
                          <Link href="/admin/heroes/new">
                            <Button variant="outline" size="sm">
                              <Plus className="mr-2 h-4 w-4" />
                              Создать первого героя
                            </Button>
                          </Link>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedHeroes.map((hero) => (
                  <TableRow key={hero.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedHeroes.has(hero.id)}
                        onCheckedChange={(checked) => 
                          handleSelectOne(hero.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{hero.name}</TableCell>
                    <TableCell>{hero.callSign}</TableCell>
                    <TableCell>
                      {new Date(hero.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/heroes/${hero.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteHeroButton 
                          id={hero.id} 
                          heroName={hero.name}
                          onDeleted={fetchHeroes}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Показано {startIndex + 1}-{Math.min(endIndex, filteredHeroes.length)} из {filteredHeroes.length}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Предыдущая
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Следующая
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить {selectedHeroes.size} {selectedHeroes.size === 1 ? 'героя' : 'героев'}?
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
