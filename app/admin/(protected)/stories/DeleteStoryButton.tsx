"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function DeleteStoryButton({ 
  id, 
  heroName,
  onDeleted
}: { 
  id: string
  heroName: string
  onDeleted?: () => void
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: "Успешно удалено",
          description: `История "${heroName}" была удалена`
        })
        setOpen(false)
        onDeleted?.()
        router.refresh()
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Не удалось удалить историю"
        })
      }
    } catch (error) {
      console.error('Error deleting story:', error)
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при удалении"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setOpen(true)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите удаление</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить историю <strong>"{heroName}"</strong>?
              <br />
              <br />
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700"
            >
              {loading ? 'Удаление...' : 'Удалить'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
