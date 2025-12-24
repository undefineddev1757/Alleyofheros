# Загрузка медиафайлов

## Как это работает

### 1. Публичная загрузка (форма `/add-heroe`)

Эндпоинт: `POST /api/submissions/upload` (не требует авторизации)

**Процесс:**
- Пользователь прикрепляет файлы в форме "Добавить героя"
- Файлы отправляются на сервер через `FormData`
- Файлы сохраняются в `/public/uploads/`
- Возвращаются URL файлов: `/uploads/[timestamp]-[random].[ext]`
- URL сохраняются в поле `mediaFiles` (массив) при создании заявки

**Пример:**
```javascript
// Загрузка файлов
const formData = new FormData()
files.forEach(file => formData.append('files', file))
const response = await fetch('/api/submissions/upload', {
  method: 'POST',
  body: formData
})
const { uploadedFiles } = await response.json()
// uploadedFiles = [{ filename: "...", url: "/uploads/..." }, ...]

// Создание заявки
await fetch('/api/submissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...data,
    mediaFiles: uploadedFiles.map(f => f.url)
  })
})
```

### 2. Админская загрузка (раздел "Медиафайлы")

Эндпоинт: `POST /api/media/upload` (требует авторизацию)

**Процесс:**
- Админ загружает файлы через интерфейс `/admin/media`
- Файлы сохраняются в `/public/uploads/`
- В базу данных добавляются записи в таблицу `MediaFile`
- Можно копировать URL и использовать в CMS

## Структура

```
public/
  uploads/
    1766581259039-2adix9.png  <- Физические файлы
    1766581423845-xz4k2l.jpg
    ...
```

## Хранение в базе

### Заявки (Submissions)
```prisma
model Submission {
  ...
  mediaFiles  String[]  @default([])  // Массив URL
  ...
}
```

### Медиафайлы администратора
```prisma
model MediaFile {
  id        String   @id @default(cuid())
  filename  String
  url       String
  size      Int
  mimeType  String
  createdAt DateTime @default(now())
}
```

## Telegram уведомления

При создании новой заявки отправляется уведомление:

```
НОВА ЗАЯВКА!

Тип: Додати героя
Герой: [Имя героя]
Телефон: [Телефон]
Telegram: [Username]
Місце: [Место проживания]
Фото: 3 шт.

Переглянути: [ссылка на админку]
```

## Проверка

1. **Файлы на диске:**
   ```bash
   ls -lh public/uploads/
   ```

2. **Статистика БД:**
   ```bash
   node scripts/check-db-stats.js
   ```

3. **Последняя заявка:**
   ```bash
   node scripts/check-last-submission.js
   ```

