# 🇺🇦 Алея Друзів - Alley of Heroes

Меморіальний веб-проект присвячений українським захисникам.

---

## 🚀 Швидкий старт

### Локальна розробка

```bash
npm install
npm run dev
```

Відкрийте http://localhost:3000

### Production Deploy з GitHub

**За 5 хвилин:**

```bash
# На сервері
git clone https://github.com/your-username/alleyofherrr.git
cd alleyofherrr
cp env.example .env
nano .env  # налаштувати змінні
bash scripts/start.sh
```

**Докладніше:** [DEPLOY_QUICK.md](./DEPLOY_QUICK.md) або [DEPLOY_FROM_GITHUB.md](./DEPLOY_FROM_GITHUB.md)

---

## 📚 Документація

| Файл | Опис |
|------|------|
| [DEPLOY_QUICK.md](./DEPLOY_QUICK.md) | Швидка шпаргалка по деплою (5 хв) |
| [DEPLOY_FROM_GITHUB.md](./DEPLOY_FROM_GITHUB.md) | Повна інструкція деплою з GitHub |
| [DEPLOY.md](./DEPLOY.md) | Докладне керівництво по розгортанню |
| [QUICKSTART.md](./QUICKSTART.md) | Швидкий старт з Docker |
| [BUILD_SUCCESS.md](./BUILD_SUCCESS.md) | Що було зроблено |

---

## 🛠️ Технології

- **Frontend:** Next.js 14, React, TypeScript
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL 16
- **Auth:** NextAuth.js
- **Deployment:** Docker, Docker Compose
- **Proxy:** Nginx (опціонально)
- **CDN:** Cloudflare

---

## 📦 Структура проекту

```
alleyofherrr/
├── app/                    # Next.js App Router
│   ├── admin/             # Адмін-панель
│   ├── api/               # API маршрути
│   ├── components/        # React компоненти
│   └── hero-page/         # Сторінки героїв
├── prisma/                # Схема БД та міграції
├── scripts/               # Скрипти деплою
├── nginx/                 # Конфігурація Nginx
├── Dockerfile             # Docker образ
└── docker-compose.yml     # Оркестрація
```

---

## ⚙️ Налаштування

### Локальна розробка

1. Скопіюйте `.env.example` в `.env.local`
2. Налаштуйте `DATABASE_URL` та інші змінні
3. Запустіть БД: `docker-compose up -d postgres`
4. Міграції: `npx prisma migrate dev`
5. Старт: `npm run dev`

### Production

Див. [DEPLOY_FROM_GITHUB.md](./DEPLOY_FROM_GITHUB.md)

---

## 🔐 Безпека

- Змініть всі паролі в `.env`
- Згенеруйте `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- Налаштуйте firewall
- Використовуйте HTTPS (Cloudflare Flexible SSL)
- Регулярно робіть backup БД

---

## 📊 Основні маршрути

| URL | Опис |
|-----|------|
| `/` | Головна сторінка |
| `/fined-heroe` | Пошук героя |
| `/your-stories` | Ваші історії |
| `/hero/[id]` | Сторінка героя |
| `/admin` | Адмін-панель |
| `/admin/login` | Вхід адміна |
| `/api/health` | Health check |

---

## 🛠️ Корисні команди

```bash
# Розробка
npm run dev          # Запуск dev сервера
npm run build        # Production build
npm run lint         # Лінтинг

# Prisma
npx prisma migrate dev       # Нова міграція
npx prisma migrate deploy    # Застосувати міграції
npx prisma studio           # GUI для БД

# Docker
docker-compose up -d        # Запуск
docker-compose logs -f      # Логи
docker-compose down         # Зупинка
```

---

## 📞 Підтримка

При виникненні проблем:

1. Перевірте [DEPLOY_FROM_GITHUB.md](./DEPLOY_FROM_GITHUB.md) розділ "Устранение неполадок"
2. Подивіться логи: `docker-compose logs -f app`
3. Перевірте health check: `curl http://localhost:3000/api/health`

---

## 📄 Ліцензія

© 2024 Алея Друзів. Всі права захищені.

---

## 🎖️ Слава Україні! 🇺🇦
