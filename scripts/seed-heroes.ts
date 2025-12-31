import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding heroes...')

  const heroes = [
    { callSign: 'Сокіл', name: 'Іванов Олександр' },
    { callSign: 'Вовк', name: 'Петренко Андрій' },
    { callSign: 'Орел', name: 'Сидоренко Максим' },
    { callSign: 'Лев', name: 'Коваленко Дмитро' },
    { callSign: 'Тигр', name: 'Мельник Сергій' },
    { callSign: 'Беркут', name: 'Бондаренко Віталій' },
    { callSign: 'Ворон', name: 'Ткаченко Ігор' },
    { callSign: 'Пантера', name: 'Шевченко Олег' },
    { callSign: 'Кобра', name: 'Кравченко Роман' },
    { callSign: 'Яструб', name: 'Кравчук Артем' },
    { callSign: 'Вогонь', name: 'Попов Володимир' },
    { callSign: 'Буря', name: 'Гончар Михайло' },
    { callSign: 'Блискавка', name: 'Павленко Тарас' },
    { callSign: 'Грім', name: 'Литвин Юрій' },
    { callSign: 'Сніг', name: 'Захарченко Віктор' },
    { callSign: 'Вітер', name: 'Семенов Павло' },
    { callSign: 'Камінь', name: 'Марченко Богдан' },
    { callSign: 'Море', name: 'Руденко Ілля' },
    { callSign: 'Гора', name: 'Білоус Антон' },
    { callSign: 'Ліс', name: 'Мороз Денис' },
    { callSign: 'Зірка', name: 'Коваль Олексій' },
    { callSign: 'Місяць', name: 'Савченко Вадим' },
    { callSign: 'Сонце', name: 'Борисенко Назар' },
    { callSign: 'Хмара', name: 'Іващенко Ярослав' },
    { callSign: 'Дощ', name: 'Федоров Станіслав' },
  ]

  for (const hero of heroes) {
    await prisma.hero.create({
      data: {
        callSign: hero.callSign,
        name: hero.name,
        isActive: true,
      },
    })
  }

  console.log(`Created ${heroes.length} heroes`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })




