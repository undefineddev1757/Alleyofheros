// Test Telegram notification
const fs = require('fs')
const path = require('path')

// Read .env file manually
const envPath = path.join(__dirname, '..', '.env')
const envContent = fs.readFileSync(envPath, 'utf8')

let BOT_TOKEN = null
let CHAT_ID = null

envContent.split('\n').forEach(line => {
  if (line.startsWith('TELEGRAM_BOT_TOKEN=')) {
    BOT_TOKEN = line.split('=')[1].replace(/"/g, '')
  }
  if (line.startsWith('TELEGRAM_CHAT_ID=')) {
    CHAT_ID = line.split('=')[1].replace(/"/g, '')
  }
})

console.log('🔍 Testing Telegram configuration...\n')
console.log(`Bot Token: ${BOT_TOKEN ? '✅ Found' : '❌ Missing'}`)
console.log(`Chat ID: ${CHAT_ID ? '✅ Found' : '❌ Missing'}\n`)

if (!BOT_TOKEN || !CHAT_ID) {
  console.error('❌ Missing Telegram credentials in .env file')
  process.exit(1)
}

async function testTelegram() {
  try {
    const message = `
🧪 ТЕСТОВЕ ПОВІДОМЛЕННЯ

Це тестове повідомлення для перевірки налаштувань Telegram бота.

Якщо ви бачите це повідомлення - все працює правильно! ✅

Час: ${new Date().toLocaleString('uk-UA')}
    `.trim()

    console.log('📤 Sending test message to Telegram...\n')

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      }
    )

    const data = await response.json()

    if (data.ok) {
      console.log('✅ SUCCESS! Test message sent to Telegram!')
      console.log(`Message ID: ${data.result.message_id}`)
      console.log(`\n🎉 Telegram notifications are working correctly!`)
    } else {
      console.error('❌ FAILED to send message:')
      console.error(JSON.stringify(data, null, 2))
    }
  } catch (error) {
    console.error('❌ ERROR:', error.message)
  }
}

testTelegram()

