#!/bin/bash

# Main startup script for the Alley of Heroes application
set -e

echo "🚀 Starting Alley of Heroes..."
echo ""

# Detect docker-compose command
if command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
  DOCKER_COMPOSE="docker compose"
else
  echo "❌ Error: Neither 'docker-compose' nor 'docker compose' found!"
  echo "Please install Docker Compose:"
  echo "  sudo apt install docker-compose-plugin"
  exit 1
fi

echo "✅ Using: $DOCKER_COMPOSE"
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
$DOCKER_COMPOSE down

echo ""
echo "🏗️  Building Docker images..."
$DOCKER_COMPOSE build --no-cache

echo ""
echo "🚀 Starting containers..."
$DOCKER_COMPOSE up -d

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
$DOCKER_COMPOSE ps

echo ""
echo "🌐 Access your application:"
echo "   - Main Site: http://localhost:${APP_PORT:-3000}"
echo "   - Admin Panel: http://localhost:${APP_PORT:-3000}/admin"
echo ""
echo "📋 Useful commands:"
echo "   - View logs: $DOCKER_COMPOSE logs -f"
echo "   - Stop all: $DOCKER_COMPOSE down"
echo "   - Restart: $DOCKER_COMPOSE restart"
echo "   - Rebuild: $DOCKER_COMPOSE up -d --build"
echo ""

