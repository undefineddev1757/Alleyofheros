import { prisma } from '../lib/prisma'

async function main() {
  const submissions = [
    {
      type: 'hero-submission',
      name: 'Іван Петренко',
      email: 'ivan@example.com',
      phone: '+380501234567',
      heroName: 'Олександр Матвієнко',
      heroStory: 'Олександр був справжнім героєм, який завжди допомагав іншим. Він служив у складі ЗСУ і врятував життя багатьом бійцям під час складних операцій.',
      status: 'pending',
    },
    {
      type: 'story-submission',
      name: 'Марія Коваленко',
      email: 'maria@example.com',
      heroStory: 'Хочу розповісти про мого брата, який загинув, захищаючи нашу землю. Він був найдобрішою людиною, яку я знала.',
      status: 'approved',
    },
    {
      type: 'contact',
      name: 'Олена Шевченко',
      email: 'olena@example.com',
      message: 'Хочу долучитися до проєкту і допомогти у збереженні пам\'яті про героїв.',
      status: 'pending',
    },
  ]

  for (const submission of submissions) {
    await prisma.submission.create({
      data: submission,
    })
  }

  console.log('✅ Test submissions created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })



