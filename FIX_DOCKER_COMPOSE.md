# 🔧 Fix: docker-compose command not found

## Проблема
```
docker-compose: command not found
```

## Причина
В новых версиях Docker команда изменилась с `docker-compose` на `docker compose` (с пробелом).

---

## ✅ Решение 1: Обновить проект на сервере (Рекомендуется)

### На сервере выполните:

```bash
cd ~/projects/Alleyofheros

# Получить обновленные скрипты
git pull origin main

# Запустить (скрипты теперь поддерживают обе версии)
bash scripts/start.sh
```

**Скрипты автоматически определят какая команда доступна!**

---

## ✅ Решение 2: Запустить вручную

Если не можете обновить проект, используйте команды напрямую:

```bash
cd ~/projects/Alleyofheros

# Используйте "docker compose" вместо "docker-compose"

# 1. Остановить старые контейнеры
docker compose down

# 2. Собрать образы
docker compose build --no-cache

# 3. Запустить
docker compose up -d

# 4. Проверить статус
docker compose ps

# 5. Подождать 10 секунд
sleep 10

# 6. Инициализировать БД
docker compose exec -T postgres pg_isready -U alley_user
docker compose exec -T app npx prisma migrate deploy
docker compose exec -T app npx prisma generate

# 7. Создать админа
docker compose exec -T app node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' }
    });

    if (existingAdmin) {
      console.log('Admin already exists');
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

    console.log('Admin created successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.\$disconnect();
  }
}

createAdmin();
"

# 8. Проверить
docker compose ps
curl http://localhost:3000/api/health
```

---

## ✅ Решение 3: Установить docker-compose (старая команда)

```bash
sudo apt update
sudo apt install docker-compose-plugin -y

# Проверить
docker-compose --version

# Теперь можно использовать bash scripts/start.sh
```

---

## 📊 Проверка какая команда работает

```bash
# Проверить Docker
docker --version

# Попробовать новую команду (с пробелом)
docker compose version

# Попробовать старую команду (с дефисом)
docker-compose --version
```

---

## 🎯 Рекомендация

**Используйте `docker compose` (с пробелом)** - это современная версия.

Все команды в документации можно заменить:
- `docker-compose` → `docker compose`

Примеры:
```bash
# Старая команда:
docker-compose up -d

# Новая команда:
docker compose up -d
```

---

## ✅ После исправления

```bash
# Проверить что всё работает
docker compose ps

# Проверить логи
docker compose logs -f app

# Health check
curl http://localhost:3000/api/health
```

---

**Скрипты обновлены и теперь поддерживают обе версии автоматически!**

