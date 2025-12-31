# 🚀 Deploy from GitHub - Пошаговая инструкция

## 📋 Что вам понадобится

- **VPS/Сервер** (Ubuntu 20.04+, Debian 11+, или другой Linux)
- **Минимум:** 2GB RAM, 10GB диск
- **Домен** (опционально, для Cloudflare)
- **GitHub репозиторий** с проектом

---

## 🖥️ Шаг 1: Подготовка сервера

### 1.1 Подключение к серверу

```bash
ssh root@ваш_сервер_IP
# или
ssh user@ваш_сервер_IP
```

### 1.2 Обновление системы

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.3 Установка Docker

```bash
# Установка Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Применение изменений (или перелогиниться)
newgrp docker

# Проверка установки
docker --version
docker-compose --version
```

### 1.4 Установка Git (если нет)

```bash
sudo apt install git -y
git --version
```

---

## 📥 Шаг 2: Клонирование проекта с GitHub

### 2.1 Клонирование репозитория

```bash
# Создать директорию для проектов
mkdir -p ~/projects
cd ~/projects

# Клонировать проект (замените URL на ваш)
git clone https://github.com/ваш-username/alleyofherrr.git
cd alleyofherrr
```

### 2.2 Если репозиторий приватный

```bash
# Вариант 1: HTTPS с токеном
git clone https://YOUR_TOKEN@github.com/ваш-username/alleyofherrr.git

# Вариант 2: SSH (нужно настроить SSH ключ)
git clone git@github.com:ваш-username/alleyofherrr.git
```

**Создание GitHub Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token → Select scopes: `repo`
3. Сохраните токен

---

## ⚙️ Шаг 3: Настройка переменных окружения

### 3.1 Создание .env файла

```bash
cp env.example .env
nano .env  # или vim, или любой другой редактор
```

### 3.2 Редактирование .env

**Обязательно измените:**

```bash
# База данных
POSTGRES_USER=alley_user
POSTGRES_PASSWORD=ваш_супер_секретный_пароль_123
POSTGRES_DB=alley_of_heroes
POSTGRES_PORT=5432

# Сгенерируйте секрет:
# openssl rand -base64 32
NEXTAUTH_SECRET=ваш_сгенерированный_секрет

# URL вашего домена (или IP)
NEXTAUTH_URL=https://yourdomain.com
# или временно: http://ваш_IP:3000

# Администратор
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=безопасный_пароль_789
ADMIN_NAME="Admin Name"

# Порт приложения
APP_PORT=3000
NODE_ENV=production
```

### 3.3 Генерация секретов

```bash
# Генерация NEXTAUTH_SECRET
openssl rand -base64 32

# Генерация POSTGRES_PASSWORD
openssl rand -hex 20
```

**Сохраните файл:** `Ctrl+O`, `Enter`, `Ctrl+X` (в nano)

---

## 🐳 Шаг 4: Запуск проекта

### Вариант 1: Автоматический (Рекомендуется)

```bash
bash scripts/start.sh
```

Скрипт автоматически:
- ✅ Соберет Docker образы
- ✅ Запустит контейнеры
- ✅ Инициализирует БД
- ✅ Создаст администратора

### Вариант 2: Пошаговый

```bash
# 1. Сборка образов
docker-compose build --no-cache

# 2. Запуск контейнеров
docker-compose up -d

# 3. Проверка запуска
docker-compose ps

# 4. Инициализация БД
bash scripts/init-db.sh
```

### Проверка работы

```bash
# Статус контейнеров
docker-compose ps

# Логи приложения
docker-compose logs -f app

# Health check
curl http://localhost:3000/api/health

# Ожидаемый ответ:
# {"status":"healthy","timestamp":"...","database":"connected"}
```

---

## 🌐 Шаг 5: Настройка Cloudflare (Flexible SSL)

### 5.1 DNS Configuration

1. Зайдите в **Cloudflare Dashboard**
2. Выберите ваш домен
3. **DNS** → **Records** → **Add record**

```
Type: A
Name: @ (для главного домена) или subdomain
IPv4 address: ваш_сервер_IP
Proxy status: Proxied (оранжевое облако включено ☁️)
TTL: Auto
```

### 5.2 SSL/TLS Settings

1. **SSL/TLS** → **Overview**
2. Выберите **Flexible**

```
┌─────────┐         ┌─────────┐         ┌─────────┐
│ Browser │ HTTPS   │Cloudflare│  HTTP  │  Server │
│         ├────────→│          ├───────→│         │
└─────────┘         └─────────┘         └─────────┘
```

### 5.3 Page Rules (Опционально)

Создайте правило для HTTPS redirect:

1. **Rules** → **Page Rules** → **Create Page Rule**
2. URL: `http://*yourdomain.com/*`
3. Setting: **Always Use HTTPS**
4. Save and Deploy

### 5.4 Обновление .env

```bash
nano .env

# Измените на ваш домен:
NEXTAUTH_URL=https://yourdomain.com
```

```bash
# Перезапустите приложение
docker-compose restart app
```

---

## 🔥 Шаг 6: Настройка Firewall (Безопасность)

### 6.1 UFW Firewall

```bash
# Установка UFW
sudo apt install ufw -y

# Разрешить SSH (ВАЖНО! Иначе потеряете доступ)
sudo ufw allow 22/tcp

# Разрешить HTTP и HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Разрешить порт приложения (только если без Nginx)
sudo ufw allow 3000/tcp

# Включить firewall
sudo ufw enable

# Проверить статус
sudo ufw status
```

### 6.2 Fail2Ban (Защита от брутфорса)

```bash
sudo apt install fail2ban -y
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 🔄 Шаг 7: Обновление проекта

### При изменениях в коде:

```bash
cd ~/projects/alleyofherrr

# 1. Остановить контейнеры
docker-compose down

# 2. Получить последние изменения
git pull origin main

# 3. Пересобрать и запустить
docker-compose up -d --build

# 4. Проверить логи
docker-compose logs -f app
```

---

## 💾 Шаг 8: Резервное копирование

### 8.1 Ручной Backup

```bash
# Создать backup базы данных
docker-compose exec postgres pg_dump -U alley_user alley_of_heroes > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup загруженных файлов
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz public/uploads/
```

### 8.2 Автоматический Backup (Cron)

```bash
# Создать скрипт backup
nano ~/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

cd /root/projects/alleyofherrr

# Backup БД
docker-compose exec -T postgres pg_dump -U alley_user alley_of_heroes > $BACKUP_DIR/db_$DATE.sql

# Backup файлов
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz public/uploads/

# Удалить старые backup (старше 7 дней)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
# Сделать скрипт исполняемым
chmod +x ~/backup.sh

# Добавить в cron (каждый день в 3 утра)
crontab -e

# Добавить строку:
0 3 * * * /root/backup.sh >> /var/log/backup.log 2>&1
```

---

## 📊 Шаг 9: Мониторинг

### 9.1 Просмотр логов

```bash
# Все сервисы
docker-compose logs -f

# Только app
docker-compose logs -f app

# Только БД
docker-compose logs -f postgres

# Последние 100 строк
docker-compose logs --tail=100 app
```

### 9.2 Статус и ресурсы

```bash
# Статус контейнеров
docker-compose ps

# Использование ресурсов
docker stats

# Health check
curl http://localhost:3000/api/health
```

---

## 🚨 Устранение неполадок

### Проблема: "Cannot connect to Docker daemon"

```bash
# Проверить статус Docker
sudo systemctl status docker

# Запустить Docker
sudo systemctl start docker

# Добавить пользователя в группу docker
sudo usermod -aG docker $USER
newgrp docker
```

### Проблема: Порт 3000 уже занят

```bash
# Найти процесс на порту 3000
sudo lsof -i :3000

# Или изменить порт в .env
nano .env
# APP_PORT=3001

# Перезапустить
docker-compose down
docker-compose up -d
```

### Проблема: Контейнер постоянно перезапускается

```bash
# Проверить логи
docker-compose logs app

# Проверить .env файл
cat .env | grep -v '^#'

# Проверить БД
docker-compose exec postgres pg_isready -U alley_user
```

### Проблема: Git pull требует пароль

```bash
# Сохранить credentials
git config --global credential.helper store

# Или использовать SSH
git remote set-url origin git@github.com:username/repo.git
```

---

## ✅ Checklist перед запуском

- [ ] Сервер обновлен (`apt update && apt upgrade`)
- [ ] Docker и Docker Compose установлены
- [ ] Проект склонирован с GitHub
- [ ] Файл `.env` создан и настроен
- [ ] `POSTGRES_PASSWORD` изменен
- [ ] `NEXTAUTH_SECRET` сгенерирован
- [ ] `NEXTAUTH_URL` установлен
- [ ] Cloudflare DNS настроен (если используется)
- [ ] Firewall настроен
- [ ] Backup скрипт создан

---

## 🎯 Итоговая команда для деплоя

```bash
# Все в одном блоке (после настройки .env)
cd ~/projects/alleyofherrr && \
docker-compose down && \
git pull origin main && \
docker-compose build --no-cache && \
docker-compose up -d && \
bash scripts/init-db.sh
```

---

## 📞 Доступ к сайту

После успешного деплоя:

| Endpoint | URL |
|----------|-----|
| **Сайт** | https://yourdomain.com |
| **Админка** | https://yourdomain.com/admin |
| **API** | https://yourdomain.com/api/* |
| **Health** | https://yourdomain.com/api/health |

**Логин в админку:**
- Email: из `.env` (`ADMIN_EMAIL`)
- Password: из `.env` (`ADMIN_PASSWORD`)

**⚠️ Сразу после первого входа измените пароль!**

---

## 🎉 Готово!

Проект успешно задеплоен с GitHub на ваш сервер!

**Полезные команды для управления:**

```bash
# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Логи
docker-compose logs -f

# Обновление
git pull && docker-compose up -d --build

# Backup
bash ~/backup.sh
```

---

**Удачного деплоя! 🚀**

