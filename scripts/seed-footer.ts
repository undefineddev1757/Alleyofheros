import { prisma } from '../lib/prisma'

async function main() {
  await prisma.footerSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      aboutText: 'Алея Друзів - проект, присвячений збереженню пам\'яті про героїв України.',
      copyrightText: '© 2024 Алея Друзів. Всі права захищені.',
      email: 'info@alleyofheroes.org',
      phone: '+380 XX XXX XX XX',
      isActive: true,
    },
  })

  console.log('Footer settings created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })




