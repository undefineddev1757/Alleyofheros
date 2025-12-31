# ⚡ Quick Start - Alley of Heroes

## 🚀 Запуск за 3 шага

### 1️⃣ Подготовка

```bash
# Клонировать репозиторий (если еще не сделано)
cd /Users/m/Desktop/alleyofherrr

# Создать .env файл
cp env.example .env

# Отредактировать .env (обязательно!)
nano .env  # или любой другой редактор
```

**Минимальные изменения в .env:**
```bash
POSTGRES_PASSWORD=your_secure_password_123
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000  # или ваш домен
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

### 2️⃣ Запуск

```bash
bash scripts/start.sh
```

Этот скрипт автоматически:
- Остановит существующие контейнеры
- Соберет Docker образы
- Запустит PostgreSQL и приложение
- Инициализирует базу данных
- Создаст администратора

### 3️⃣ Готово!

Откройте браузер:
- **Сайт**: http://localhost:3000
- **Админка**: http://localhost:3000/admin
  - Email: admin@example.com (или ваш из .env)
  - Password: admin123 (или ваш из .env)

---

## 📦 Что включено

- ✅ Next.js 14 приложение
- ✅ PostgreSQL 16 база данных
- ✅ Prisma ORM
- ✅ NextAuth аутентификация
- ✅ Админ-панель
- ✅ Загрузка файлов
- ✅ Health checks
- ✅ Nginx reverse proxy (опционально)

---

## 🛠️ Полезные команды

```bash
# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Пересборка после изменений
docker-compose up -d --build

# Backup БД
docker-compose exec postgres pg_dump -U alley_user alley_of_heroes > backup.sql
```

---

## 📚 Дополнительно

Полное руководство: [DEPLOY.md](./DEPLOY.md)

Возникли проблемы? Проверьте:
```bash
# Статус контейнеров
docker-compose ps

# Health check
curl http://localhost:3000/api/health

# Логи приложения
docker-compose logs app

# Логи БД
docker-compose logs postgres
```

---

## 🌐 Production Deployment

### С Cloudflare:

1. Настройте DNS A-запись на ваш сервер
2. Включите Cloudflare Proxy (оранжевое облако)
3. SSL/TLS → Flexible mode
4. Обновите `NEXTAUTH_URL` в `.env` на ваш домен

### С Nginx:

```bash
docker-compose --profile production up -d
```

---

**🎉 Готово! Проект запущен и готов к работе!**

