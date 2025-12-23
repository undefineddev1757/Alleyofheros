import { prisma } from '../lib/prisma'

async function main() {
  const pages = [
    {
      slug: 'your-stories',
      title: 'Ваші історії',
      description: 'Поділіться історіями про героїв',
      metaTitle: 'Ваші історії - Алея Друзів',
      metaDescription: 'Розкажіть про героя, якого ви знали. Збережемо пам\'ять разом.',
      isActive: true,
    },
    {
      slug: 'find-hero',
      title: 'Знайти героя',
      description: 'Пошук героя за іменем',
      metaTitle: 'Знайти героя - Алея Друзів',
      metaDescription: 'Знайдіть героя в нашій базі даних',
      isActive: true,
    },
  ]

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    })
  }

  console.log('✅ Pages seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

