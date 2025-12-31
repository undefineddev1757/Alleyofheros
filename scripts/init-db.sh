#!/bin/bash

# Script to initialize the database and create admin user
set -e

# Detect docker-compose command
if command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
  DOCKER_COMPOSE="docker compose"
else
  echo "❌ Error: Neither 'docker-compose' nor 'docker compose' found!"
  exit 1
fi

echo "🔄 Waiting for PostgreSQL to be ready..."
until $DOCKER_COMPOSE exec -T postgres pg_isready -U ${POSTGRES_USER:-alley_user} > /dev/null 2>&1; do
  echo "   Waiting for database connection..."
  sleep 2
done

echo "✅ PostgreSQL is ready!"

echo "🔄 Running Prisma migrations..."
$DOCKER_COMPOSE exec -T app node_modules/.bin/prisma migrate deploy

echo "🔄 Generating Prisma Client..."
$DOCKER_COMPOSE exec -T app node_modules/.bin/prisma generate

echo "🔄 Creating initial admin user..."
$DOCKER_COMPOSE exec -T app node -e "
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

