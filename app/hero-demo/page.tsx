import HeroPageFull from '@/app/hero-page/HeroPageFull'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

async function getFooterSettings() {
  try {
    let settings = await prisma.footerSettings.findFirst({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await prisma.footerSettings.create({
        data: {
          id: 'default',
          copyrightText_ua: '© 2025',
          copyrightText_en: '© 2025',
          isActive: true,
        },
      })
    }
    
    return settings
  } catch (error) {
    console.error("Error fetching footer settings:", error)
    return null
  }
}

export default async function HeroDemoPage() {
  const footerSettings = await getFooterSettings()
  
  // Данные Жреца для демонстрации
  const demoHero = {
    callSign: 'Жрець',
    name: 'Володимир Плетньов',
    bannerUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/f62a753ba21a06c9e2fc1cc53021b7f63a2ea755?width=2880'
  }

  return <HeroPageFull hero={demoHero} footerSettings={footerSettings} />
}

