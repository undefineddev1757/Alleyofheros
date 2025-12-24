"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type Language = 'ua' | 'en'

interface LanguageToggleProps {
  currentLang: Language
  onChange: (lang: Language) => void
}

export function LanguageToggle({ currentLang, onChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex items-center gap-2 p-1 bg-muted rounded-lg">
      <Button
        type="button"
        variant={currentLang === 'ua' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('ua')}
        className="font-semibold"
      >
        🇺🇦 UA
      </Button>
      <Button
        type="button"
        variant={currentLang === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('en')}
        className="font-semibold"
      >
        🇬🇧 EN
      </Button>
    </div>
  )
}

export type { Language }

