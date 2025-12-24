import { prisma } from '../lib/prisma'

async function main() {
  await prisma.findHeroPageSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      bannerTitle: 'Знайти героя',
      searchPlaceholder: 'Позивний/ПІБ',
      medalImageUrl: 'https://api.builder.io/api/v1/image/assets/TEMP/12daba71a01ffc2fafdfaa3af92bdeb993584487?width=560',
      isActive: true,
    },
  })

  console.log('Find Hero settings created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

