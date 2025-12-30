"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Lock, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function TwoFactorSetup({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [qrCode, setQrCode] = useState("")
  const [secret, setSecret] = useState("")
  const [token, setToken] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/users/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setUser(data)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    fetchUser()
  }, [params.id])

  const handleSetup = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/users/${params.id}/2fa/setup`, {
        method: "POST",
      })

      if (response.ok) {
        const data = await response.json()
        setQrCode(data.qrCode)
        setSecret(data.secret)
      } else {
        setError("Ошибка при настройке 2FA")
      }
    } catch (err) {
      setError("Ошибка при настройке 2FA")
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async () => {
    if (!token || token.length !== 6) {
      setError("Введите 6-значный код")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`/api/admin/users/${params.id}/2fa/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push(`/admin/users/${params.id}`)
          router.refresh()
        }, 2000)
      } else {
        setError("Неверный код. Попробуйте еще раз.")
      }
    } catch (err) {
      setError("Ошибка при проверке кода")
    } finally {
      setLoading(false)
    }
  }

  const handleDisable = async () => {
    if (!confirm("Вы уверены, что хотите отключить 2FA?")) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/admin/users/${params.id}/2fa/disable`, {
        method: "POST",
      })

      if (response.ok) {
        router.push(`/admin/users/${params.id}`)
        router.refresh()
      }
    } catch (err) {
      setError("Ошибка при отключении 2FA")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href={`/admin/users/${params.id}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Настройка 2FA</h1>
          <p className="text-muted-foreground">
            Двухфакторная аутентификация для {user?.email}
          </p>
        </div>
      </div>

      {user?.twoFactorEnabled ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              2FA включена
            </CardTitle>
            <CardDescription>
              Двухфакторная аутентификация активна для этого пользователя
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-800 font-medium">
                <Lock className="h-5 w-5" />
                Защита активирована
              </div>
              <p className="text-sm text-green-700 mt-2">
                Для входа требуется код из приложения Google Authenticator
              </p>
            </div>

            <Button
              onClick={handleDisable}
              variant="destructive"
              disabled={loading}
            >
              {loading ? "Отключение..." : "Отключить 2FA"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {!qrCode ? (
            <Card>
              <CardHeader>
                <CardTitle>Включить 2FA</CardTitle>
                <CardDescription>
                  Повысьте безопасность аккаунта с двухфакторной аутентификацией
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Что нужно сделать:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Установите Google Authenticator на телефон</li>
                    <li>Нажмите кнопку "Начать настройку"</li>
                    <li>Отсканируйте QR-код в приложении</li>
                    <li>Введите 6-значный код для подтверждения</li>
                  </ol>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    {error}
                  </div>
                )}

                <Button onClick={handleSetup} disabled={loading}>
                  {loading ? "Настройка..." : "Начать настройку"}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Сканируйте QR-код</CardTitle>
                <CardDescription>
                  Откройте Google Authenticator и отсканируйте код
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {success ? (
                  <div className="text-center p-8 bg-green-50 rounded-lg">
                    <Shield className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      2FA успешно включена!
                    </h3>
                    <p className="text-green-700">
                      Перенаправление...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center">
                      <div className="border-4 border-gray-200 rounded-lg p-4 bg-white">
                        <img src={qrCode} alt="QR Code" className="w-64 h-64" />
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-2">
                        Или введите код вручную:
                      </p>
                      <code className="px-4 py-2 bg-muted rounded font-mono text-sm">
                        {secret}
                      </code>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="token">Введите 6-значный код из приложения</Label>
                        <Input
                          id="token"
                          value={token}
                          onChange={(e) => setToken(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          placeholder="000000"
                          maxLength={6}
                          className="text-center text-2xl tracking-widest"
                        />
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                          {error}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <Button
                          onClick={handleVerify}
                          disabled={loading || token.length !== 6}
                          className="flex-1"
                        >
                          {loading ? "Проверка..." : "Подтвердить и включить"}
                        </Button>
                        <Button
                          onClick={() => {
                            setQrCode("")
                            setSecret("")
                            setToken("")
                            setError("")
                          }}
                          variant="outline"
                        >
                          Отмена
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  )
}



