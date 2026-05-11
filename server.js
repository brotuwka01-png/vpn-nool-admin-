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
let messages = []

bot.on('message', (msg) => {

  const id = msg.from.id
  const username = msg.from.username || 'unknown'

  if (!users.find(u => u.id === id)) {

    users.push({
      id,
      username,
      time: new Date().toLocaleTimeString()
    })

  }

  messages.unshift({
    username,
    text: msg.text || 'media',
    time: new Date().toLocaleTimeString()
  })

  messages = messages.slice(0, 15)

})

bot.onText(/\/start/, (msg) => {

bot.sendMessage(msg.chat.id,

`🌌 VPN NOOL

🚀 Добро пожаловать

🛡 Премиум VPN сервис
⚡ Быстрое подключение
🌍 Доступ ко всему интернету

Выберите действие ниже 👇`,

{
reply_markup:{
keyboard:[

['🛒 Купить'],

['🛠 Поддержка']

],
resize_keyboard:true
}
}

)

})

bot.on('message', (msg) => {

if(msg.text === '🛒 Купить'){

bot.sendMessage(msg.chat.id,

`⚠ Бот временно недоступен

🔑 Для покупки VPN ключа:

👑 Владелец:
@SIKI_OFFICIAL`
)

}

if(msg.text === '🛠 Поддержка'){

bot.sendMessage(msg.chat.id,

`🛠 Техническая поддержка

👤 Администратор:
@SIKI_OFFICIAL`
)

}

})

app.get('/', (req, res) => {

res.send(`
<html>

<head>

<title>VPN NOOL ADMIN</title>

<meta charset="UTF-8">

<meta http-equiv="refresh" content="3">

<style>

body{
background:#050510;
font-family:sans-serif;
color:white;
margin:0;
padding:30px;
}

.title{
font-size:50px;
font-weight:900;
color:#a855f7;
margin-bottom:10px;
text-shadow:0 0 20px #a855f7;
}

.online{
color:#00ff88;
font-weight:bold;
margin-bottom:30px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:#111122;
border:1px solid #7e22ce;
border-radius:25px;
padding:25px;
box-shadow:0 0 25px rgba(168,85,247,.3);
}

.big{
font-size:40px;
font-weight:900;
margin-top:10px;
}

.logs{
margin-top:40px;
background:#111122;
padding:20px;
border-radius:25px;
border:1px solid #7e22ce;
}

.log{
padding:10px;
border-bottom:1px solid #222;
}

.username{
color:#c084fc;
font-weight:bold;
}

</style>

</head>

<body>

<div class="title">
VPN NOOL ADMIN
</div>

<div class="online">
● SYSTEM ONLINE
</div>

<div class="grid">

<div class="card">
<div>Пользователи</div>
<div class="big">
${users.length}
</div>
</div>

<div class="card">
<div>Сообщения</div>
<div class="big">
${messages.length}
</div>
</div>

<div class="card">
<div>Статус</div>
<div class="big online">
ONLINE
</div>
</div>

<div class="card">
<div>VPN Nodes</div>
<div class="big">
12
</div>
</div>

</div>

<div class="logs">

<h2>LIVE ACTIVITY</h2>

${messages.map(m => `
<div class="log">

<span class="username">
@${m.username}
</span>

: ${m.text}

<br>

<small>${m.time}</small>

</div>
`).join('')}

</div>

</body>
</html>
`)

})

app.listen(3000, () => {
console.log('VPN NOOL ADMIN STARTED')
})
