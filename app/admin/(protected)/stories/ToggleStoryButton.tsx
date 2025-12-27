"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ToggleStoryButton({ 
  id, 
  isActive,
  onToggled
}: { 
  id: string
  isActive: boolean
  onToggled?: () => void
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleToggle = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        toast({
          title: "Статус изменен",
          description: isActive ? "История скрыта" : "История показана"
        })
        onToggled?.()
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось изменить статус"
        })
      }
    } catch (error) {
      console.error('Error toggling story:', error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при изменении статуса"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={handleToggle}
      disabled={loading}
    >
      {isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
    </Button>
  )
}
