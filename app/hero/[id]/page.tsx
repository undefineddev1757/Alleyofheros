import { notFound } from 'next/navigation'
import HeroPageFull from '@/app/hero-page/HeroPageFull'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: {
    id: string
  }
}

async function getHero(id: string) {
  try {
    const hero = await prisma.hero.findUnique({
      where: { id },
    })

    return hero
  } catch (error) {
    console.error('Error fetching hero:', error)
    return null
  }
}

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

export default async function HeroPage({ params }: PageProps) {
  const hero = await getHero(params.id)
  const footerSettings = await getFooterSettings()

  if (!hero) {
    notFound()
  }

  return <HeroPageFull hero={hero} footerSettings={footerSettings} />
}

