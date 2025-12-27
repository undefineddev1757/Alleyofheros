import { prisma } from '../lib/prisma'

async function main() {
  // Update existing admin to have admin role
  const admin = await prisma.admin.updateMany({
    where: { email: 'admin@example.com' },
    data: {
      role: 'admin',
      isActive: true,
    },
  })

  console.log('✅ Admin role updated successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


