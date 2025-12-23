import { prisma } from '../lib/prisma'

async function main() {
  const sections = [
    {
      sectionKey: 'hero',
      title: 'Алея',
      subtitle: 'Друзів',
      content: 'Тут ми пам\'ятаємо не лише подвиги, а й людину за ними',
      videoUrl: '/6034431_Aerialiew_1920x1080.mp4',
      order: 1,
      isActive: true,
    },
    {
      sectionKey: 'about',
      title: 'Тут — історії людей, які переписали історію країни',
      subtitle: 'Про алею',
      content: `Ми хочемо, щоб про них пам'ятали та знали, що це були не просто хоробрі воїни, а ті, хто допомагав усім, хто потребував, хто був щирим, добрим, жив на повну і ніколи не втрачав віру — у себе й у свою країну.

Вони своїми вчинками переписали історію України, яку згодом вивчатимуть нові покоління. І ми зробимо все, щоб пам'ять про них — як про людей — залишалася в кожному.`,
      order: 2,
      isActive: true,
    },
    {
      sectionKey: 'heroes',
      title: 'Наші герої',
      subtitle: 'Пам\'ятаємо кожного',
      content: 'Кожен з них — унікальна історія, кожен — справжній герой',
      order: 3,
      isActive: true,
    },
    {
      sectionKey: 'stories',
      title: 'Ваші історії',
      subtitle: 'Поділіться спогадами',
      content: 'Розкажіть про героя, якого ви знали',
      order: 4,
      isActive: true,
    },
    {
      sectionKey: 'gallery',
      title: 'Галерея',
      subtitle: 'Фото з заходів',
      content: '',
      order: 5,
      isActive: true,
    },
  ]

  for (const section of sections) {
    await prisma.pageSection.upsert({
      where: { sectionKey: section.sectionKey },
      update: section,
      create: section,
    })
  }

  console.log('✅ Page sections seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

