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
import { Plus, Edit, Shield, ShieldCheck, Lock } from "lucide-react"

export default async function UsersManagement() {
  const users = await prisma.admin.findMany({
    orderBy: { createdAt: "desc" },
  })

  const getRoleIcon = (role: string) => {
    return role === "admin" ? (
      <ShieldCheck className="h-4 w-4 text-red-600" />
    ) : (
      <Shield className="h-4 w-4 text-blue-600" />
    )
  }

  const getRoleText = (role: string) => {
    return role === "admin" ? "Администратор" : "Писатель"
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Управление пользователями</h1>
          <p className="text-muted-foreground">
            Пользователи и роли системы
          </p>
        </div>
        <Link href="/admin/users/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Добавить пользователя
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Всего пользователей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Администраторы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {users.filter(u => u.role === "admin").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>С 2FA</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {users.filter(u => u.twoFactorEnabled).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Пользователи</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>2FA</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    Нет пользователей
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || "—"}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user.role)}
                        <span>{getRoleText(user.role)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.twoFactorEnabled ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <Lock className="h-4 w-4" />
                          Включен
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Выключен</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <span className="text-green-600">Активен</span>
                      ) : (
                        <span className="text-red-600">Заблокирован</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/admin/users/${user.id}`}>
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




