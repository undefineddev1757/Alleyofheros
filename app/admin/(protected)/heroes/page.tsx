import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

export default async function HeroesPage() {
  const heroes = await prisma.hero.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление героями</h1>
          <p className="text-muted-foreground">
            Список всех героев в системе
          </p>
        </div>
        <Link href="/admin/heroes/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить героя
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Список героев</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Дата создания</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heroes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    Нет героев
                  </TableCell>
                </TableRow>
              ) : (
                heroes.map((hero) => (
                  <TableRow key={hero.id}>
                    <TableCell className="font-medium">{hero.name}</TableCell>
                    <TableCell>
                      {hero.description?.substring(0, 50)}
                      {hero.description && hero.description.length > 50 ? "..." : ""}
                    </TableCell>
                    <TableCell>
                      {new Date(hero.createdAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
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

