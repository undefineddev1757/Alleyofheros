# ⚡ Быстрый Deploy с GitHub - Шпаргалка

## 🚀 Деплой за 5 минут

### На сервере (первый раз):

```bash
# 1. Установить Docker
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
sudo usermod -aG docker $USER && newgrp docker

# 2. Клонировать проект
cd ~ && git clone https://github.com/ваш-username/alleyofherrr.git
cd alleyofherrr

# 3. Настроить .env
cp env.example .env
nano .env
# Изменить: POSTGRES_PASSWORD, NEXTAUTH_SECRET, NEXTAUTH_URL, ADMIN_EMAIL, ADMIN_PASSWORD

# 4. Запустить
bash scripts/start.sh

# 5. Проверить
curl http://localhost:3000/api/health
```

---

## 🔄 Обновление кода

```bash
cd ~/alleyofherrr
docker-compose down
git pull origin main
docker-compose up -d --build
```

---

## 🌐 Cloudflare Flexible SSL

### 1. DNS запись:
```
Type: A
Name: @
IP: ваш_сервер_IP
Proxy: ВКЛ ☁️
```

### 2. SSL настройка:
```
SSL/TLS → Overview → Flexible
```

### 3. Обновить .env:
```bash
NEXTAUTH_URL=https://yourdomain.com
```

### 4. Перезапустить:
```bash
docker-compose restart app
```

---

## 🔥 Firewall (обязательно!)

```bash
sudo apt install ufw -y
sudo ufw allow 22/tcp    # SSH - ВАЖНО!
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

---

## 💾 Backup

```bash
# БД
docker-compose exec postgres pg_dump -U alley_user alley_of_heroes > backup.sql

# Файлы
tar -czf uploads_backup.tar.gz public/uploads/
```

---

## 📊 Мониторинг

```bash
# Статус
docker-compose ps

# Логи
docker-compose logs -f app

# Ресурсы
docker stats

# Health
curl http://localhost:3000/api/health
```

---

## 🛠️ Полезные команды

```bash
# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Полное удаление (с БД!)
docker-compose down -v

# Пересборка
docker-compose build --no-cache

# Войти в контейнер
docker-compose exec app sh
```

---

## 🚨 Если что-то сломалось

```bash
# 1. Смотрим логи
docker-compose logs app

# 2. Проверяем .env
cat .env

# 3. Проверяем БД
docker-compose exec postgres pg_isready -U alley_user

# 4. Перезапускаем всё
docker-compose down
docker-compose up -d --build

# 5. Если не помогло - очистка и заново
docker-compose down -v
bash scripts/start.sh
```

---

## 📁 Важные файлы

```
~/alleyofherrr/
├── .env                    ← Настройки (НЕ коммитить!)
├── docker-compose.yml      ← Конфигурация Docker
├── scripts/start.sh        ← Автозапуск
└── scripts/init-db.sh      ← Инициализация БД
```

---

## 🎯 Checklist

- [ ] Docker установлен
- [ ] Проект склонирован
- [ ] `.env` настроен (пароли, секреты, URL)
- [ ] `bash scripts/start.sh` выполнен
- [ ] Cloudflare DNS настроен
- [ ] Firewall включен
- [ ] Сайт работает: `curl http://localhost:3000/api/health`

---

## 📞 После деплоя

**Сайт:** https://yourdomain.com  
**Админка:** https://yourdomain.com/admin  
**Логин:** из `.env` (ADMIN_EMAIL / ADMIN_PASSWORD)

**⚠️ Сразу измените пароль админа!**

---

**Полная инструкция:** [DEPLOY_FROM_GITHUB.md](./DEPLOY_FROM_GITHUB.md)

