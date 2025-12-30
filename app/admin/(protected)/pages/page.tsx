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
import { Plus, Edit, Eye, EyeOff } from "lucide-react"

export default async function PagesManagement() {
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { sections: true }
      }
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление страницами</h1>
          <p className="text-muted-foreground">
            Редактируйте контент страниц сайта
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить страницу
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Страницы сайта</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Разделов</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Нет страниц
                  </TableCell>
                </TableRow>
              ) : (
                pages.map((page) => (
                  <TableRow key={page.id}>
                    <TableCell className="font-medium">{page.title}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-2 py-1 rounded text-sm">
                        /{page.slug}
                      </code>
                    </TableCell>
                    <TableCell>{page._count.sections}</TableCell>
                    <TableCell>
                      {page.isActive ? (
                        <span className="flex items-center gap-1 text-green-600">
                          <Eye className="h-4 w-4" />
                          Активна
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-gray-400">
                          <EyeOff className="h-4 w-4" />
                          Скрыта
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/pages/${page.id}`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
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



