require('dotenv').config()

const express = require('express')
const TelegramBot = require('node-telegram-bot-api')
const cors = require('cors')

const app = express()

app.use(cors())

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true
})

let users = []

bot.on('message', (msg) => {
  const id = msg.from.id

  if (!users.includes(id)) {
    users.push(id)
  }
})

app.get('/', (req, res) => {
  res.send(`
  <html>
  <body style="background:black;color:violet;font-family:sans-serif;text-align:center;padding-top:100px;">
  
  <h1>VPN NOOL ADMIN</h1>
  
  <h2>Users: ${users.length}</h2>
  
  <p>BOT ONLINE</p>

  </body>
  </html>
  `)
})

app.listen(3000, () => {
  console.log('SERVER STARTED')
})
