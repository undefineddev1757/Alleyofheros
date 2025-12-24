import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting multilang migration...')

  // 1. Fetch existing data
  const existingSettings = await prisma.$queryRaw<any[]>`
    SELECT * FROM home_page_settings LIMIT 1
  `

  if (existingSettings.length === 0) {
    console.log('⚠️  No existing settings found. Creating default...')
    return
  }

  const settings = existingSettings[0]
  console.log('📦 Found existing settings:', settings.id)

  // 2. Add new multilang columns
  console.log('🔄 Adding new multilang columns...')
  
  const columnsToAdd = [
    'heroTitle_ua', 'heroTitle_en', 'heroSubtitle_ua', 'heroSubtitle_en',
    'heroDescription_ua', 'heroDescription_en', 'aboutLabel_ua', 'aboutLabel_en',
    'aboutTitle_ua', 'aboutTitle_en', 'aboutText1_ua', 'aboutText1_en',
    'aboutText2_ua', 'aboutText2_en', 'heroesTitle_ua', 'heroesTitle_en',
    'heroesSubtitle_ua', 'heroesSubtitle_en', 'stoneTitle_ua', 'stoneTitle_en',
    'stoneQuote_ua', 'stoneQuote_en', 'galleryTitle_ua', 'galleryTitle_en',
    'gallerySubtitle_ua', 'gallerySubtitle_en'
  ]
  
  for (const column of columnsToAdd) {
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE home_page_settings ADD COLUMN IF NOT EXISTS "${column}" TEXT`
      )
    } catch (error) {
      console.log(`   Column ${column} might already exist, skipping...`)
    }
  }

  // 3. Copy data to UA fields
  console.log('📋 Copying existing data to UA fields...')
  
  await prisma.$executeRaw`
    UPDATE home_page_settings SET
      "heroTitle_ua" = "heroTitle",
      "heroSubtitle_ua" = "heroSubtitle",
      "heroDescription_ua" = "heroDescription",
      "aboutLabel_ua" = "aboutLabel",
      "aboutTitle_ua" = "aboutTitle",
      "aboutText1_ua" = "aboutText1",
      "aboutText2_ua" = "aboutText2",
      "heroesTitle_ua" = "heroesTitle",
      "heroesSubtitle_ua" = "heroesSubtitle",
      "stoneTitle_ua" = "stoneTitle",
      "stoneQuote_ua" = "stoneQuote",
      "galleryTitle_ua" = "galleryTitle",
      "gallerySubtitle_ua" = "gallerySubtitle"
  `

  // 4. Drop old columns
  console.log('🗑️  Removing old columns...')
  
  const columnsToDrop = [
    'heroTitle', 'heroSubtitle', 'heroDescription', 'aboutLabel',
    'aboutTitle', 'aboutText1', 'aboutText2', 'heroesTitle',
    'heroesSubtitle', 'stoneTitle', 'stoneQuote', 'galleryTitle', 'gallerySubtitle'
  ]
  
  for (const column of columnsToDrop) {
    try {
      await prisma.$executeRawUnsafe(
        `ALTER TABLE home_page_settings DROP COLUMN IF EXISTS "${column}"`
      )
    } catch (error) {
      console.log(`   Column ${column} might not exist, skipping...`)
    }
  }

  console.log('✅ Migration completed successfully!')
  console.log('ℹ️  English fields are empty - you can fill them in the admin panel')
}

main()
  .catch((e) => {
    console.error('❌ Migration failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

