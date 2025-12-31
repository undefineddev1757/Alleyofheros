import { prisma } from '../lib/prisma'

async function main() {
  await prisma.homePageSettings.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      
      // Hero Banner
      heroTitle: 'Алея',
      heroSubtitle: 'Друзів',
      heroDescription: 'Тут ми пам\'ятаємо не лише подвиги, а й людину за ними',
      heroVideoUrl: '/6034431_Aerialiew_1920x1080.mp4',
      
      // About Section
      aboutLabel: 'Про алею',
      aboutTitle: 'Тут — історії людей, які переписали історію країни',
      aboutText1: 'Ми хочемо, щоб про них пам\'ятали та знали, що це були не просто хоробрі воїни, а ті, хто допомагав усім, хто потребував, хто був щирим, добрим, жив на повну і ніколи не втрачав віру — у себе й у свою країну.',
      aboutText2: 'Вони своїми вчинками переписали історію України, яку згодом вивчатимуть нові покоління. І ми зробимо все, щоб пам\'ять про них — як про людей — залишалася в кожному.',
      
      // Heroes Slider
      heroesTitle: 'Наші герої',
      heroesSubtitle: 'Пам\'ятаємо кожного',
      showHeroesSlider: true,
      
      // Stone Block
      stoneTitle: 'Цитата або заголовок',
      stoneQuote: 'Вони залишили слід в історії',
      showStoneBlock: true,
      
      // Gallery
      galleryTitle: 'Галерея',
      gallerySubtitle: 'Фото з заходів',
      showGallery: true,
      
      isActive: true,
    },
  })

  console.log('✅ Home page settings created successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })




