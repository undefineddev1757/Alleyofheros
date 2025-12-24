"use client"

import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function TitleUpdater() {
  const { language, isReady } = useLanguage()

  useEffect(() => {
    if (isReady) {
      // Update title
      const title = language === 'ua' ? 'Алея Друзів' : 'Alley of Friends'
      document.title = title
      
      // Update html lang attribute
      document.documentElement.lang = language
      
      // Update meta description
      const description = language === 'ua' 
        ? "Тут ми пам'ятаємо не лише подвиги, а й людину за ними"
        : "Here we remember not only the feats, but also the person behind them"
      
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', description)
      }
    }
  }, [language, isReady])

  return null
}

