"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'ua' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isReady: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ua')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Load language from localStorage on mount (client-side only)
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'ua' || saved === 'en')) {
      setLanguageState(saved)
    }
    setIsReady(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export type { Language }

