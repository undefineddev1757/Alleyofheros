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
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"

export default async function HomePageManagement() {
  const sections = await prisma.pageSection.findMany({
    orderBy: { order: "asc" },
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление главной страницей</h1>
          <p className="text-muted-foreground">
            Редактируйте разделы главной страницы
          </p>
        </div>
        <Link href="/admin/home-page/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить раздел
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Разделы страницы</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Порядок</TableHead>
                <TableHead>Ключ</TableHead>
                <TableHead>Заголовок</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sections.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Нет разделов
                  </TableCell>
                </TableRow>
              ) : (
                sections.map((section) => (
                  <TableRow key={section.id}>
                    <TableCell className="font-medium">{section.order}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        {section.sectionKey}
                      </code>
                    </TableCell>
                    <TableCell>{section.title || "—"}</TableCell>
                    <TableCell>
                      {section.isActive ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <Eye className="h-4 w-4" />
                          Активен
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                          <EyeOff className="h-4 w-4" />
                          Скрыт
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/home-page/${section.id}`}>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
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


