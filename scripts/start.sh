#!/bin/bash

# Main startup script for the Alley of Heroes application
set -e

echo "🚀 Starting Alley of Heroes..."
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
  echo "⚠️  No .env file found!"
  echo "📝 Creating .env from .env.production.example..."
  cp .env.production.example .env
  echo ""
  echo "⚠️  IMPORTANT: Please edit .env file with your configuration"
  echo "   Especially update these values:"
  echo "   - POSTGRES_PASSWORD"
  echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
  echo "   - NEXTAUTH_URL"
  echo "   - ADMIN_EMAIL"
  echo "   - ADMIN_PASSWORD"
  echo ""
  read -p "Press Enter after updating .env file..."
fi

# Load environment variables
export $(cat .env | grep -v '^#' | xargs)

echo "🛑 Stopping existing containers..."
docker-compose down

echo ""
echo "🏗️  Building Docker images..."
docker-compose build --no-cache

echo ""
echo "🚀 Starting containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be healthy..."
sleep 10

echo ""
echo "🔧 Initializing database..."
bash scripts/init-db.sh

echo ""
echo "✅ All services are running!"
echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "🌐 Access your application:"
echo "   - Main Site: http://localhost:${APP_PORT:-3000}"
echo "   - Admin Panel: http://localhost:${APP_PORT:-3000}/admin"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Stop all: docker-compose down"
echo "   - Restart: docker-compose restart"
echo "   - Rebuild: docker-compose up -d --build"
echo ""

