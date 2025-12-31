import { prisma } from '../lib/prisma'

async function main() {
  await prisma.yourStoriesPageSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      bannerTitle: 'ВАШІ ІСТОРІЇ',
      bannerSubtitle: 'Ми створюємо місце, де на стінах з\'являються портрети загиблих військових.',
      searchPlaceholder: 'Позивний/ПІБ',
      formTitle: 'у кожного — свій захисник, своя історія',
      formSubtitle: 'Поділись історією свого героя',
      formButtonText: 'Заповнити форму',
      isActive: true,
    },
  })

  console.log('Your Stories settings created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })




