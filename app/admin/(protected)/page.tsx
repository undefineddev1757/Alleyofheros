import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  const [heroesCount, storiesCount] = await Promise.all([
    prisma.hero.count(),
    prisma.story.count(),
  ])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <p className="text-muted-foreground">
          Добро пожаловать, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Герои</CardTitle>
            <CardDescription>Всего героев в базе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{heroesCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Истории</CardTitle>
            <CardDescription>Всего историй в базе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storiesCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

