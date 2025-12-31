#!/bin/bash

# Script to initialize the database and create admin user
set -e

echo "🔄 Waiting for PostgreSQL to be ready..."
until docker-compose exec -T postgres pg_isready -U ${POSTGRES_USER:-alley_user} > /dev/null 2>&1; do
  echo "   Waiting for database connection..."
  sleep 2
done

echo "✅ PostgreSQL is ready!"

echo "🔄 Running Prisma migrations..."
docker-compose exec -T app npx prisma migrate deploy

echo "🔄 Generating Prisma Client..."
docker-compose exec -T app npx prisma generate

echo "🔄 Creating initial admin user..."
docker-compose exec -T app node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123',
      10
    );

    await prisma.admin.create({
      data: {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: hashedPassword,
        name: process.env.ADMIN_NAME || 'Admin'
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Email:', process.env.ADMIN_EMAIL || 'admin@example.com');
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    await prisma.\$disconnect();
  }
}

createAdmin();
"

echo "✅ Database initialization completed!"
echo ""
echo "🎉 Setup complete! You can now access:"
echo "   - Application: http://localhost:${APP_PORT:-3000}"
echo "   - Admin Panel: http://localhost:${APP_PORT:-3000}/admin"
echo ""
echo "📧 Admin credentials:"
echo "   Email: ${ADMIN_EMAIL:-admin@example.com}"
echo "   Password: ${ADMIN_PASSWORD:-admin123}"
echo ""
echo "⚠️  IMPORTANT: Change the admin password after first login!"

