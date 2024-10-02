const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(morgan(':date[clf] :method :url :status :res[content-length] - :response-time ms'))

app.use(express.urlencoded({ extended: true }))

// 自定義日誌中間件
app.use((req, res, next) => {
  console.log(`Received request for ${req.method} ${req.url}`, '\n')

  // 記錄請求主體
  // console.log('Request Body:', req.body, '\n')

  // 攔截和記錄響應
  const oldSend = res.send
  res.send = function(data) {
    // console.log('Response Body:', data)
    oldSend.apply(res, arguments)
  }

  next()
})

// 登入
app.post('/dev-api/user/login', require('./api/router/user/login'))
app.get('/dev-api/user/info', require('./api/router/user/info'))
app.post('/dev-api/user/logout', require('./api/router/user/logout'))

// 故事
app.get('/dev-api/story/list', require('./api/router/story/list'))
app.get('/dev-api/story/:id', require('./api/router/story/one'))
app.post('/dev-api/story', require('./api/router/story/create'))
app.put('/dev-api/story/:id', require('./api/router/story/edit'))

// chatgpt 使用
app.post('/dev-api/gpt-init', require('./api/router/bot/step1'))
app.post('/dev-api/gpt-init2', require('./api/router/bot/step2'))
app.post('/dev-api/gpt-message', require('./api/router/bot/sendMessage'))
app.get('/dev-api/gpt-history', require('./api/router/bot/getMessageList'))
app.post('/dev-api/gpt-history', require('./api/router/bot/addMessageList'))
app.post('/dev-api/gpt-endMessage', require('./api/router/bot/endMessage'))

// 提示工程
app.put('/dev-api/prompt/edit', require('./api/router/prompt/edit'))
app.get('/dev-api/prompt', require('./api/router/prompt/one'))

// 聊天內容
app.get('/dev-api/dashboard/message/user/list', require('./api/router/message/userList'))
app.get('/dev-api/dashboard/message/user/:userId', require('./api/router/message/userOne'))
app.get('/dev-api/dashboard/message/dateList', require('./api/router/message/dateList'))

// 群組資訊
app.get('/dev-api/dashboard/message/userGroup/list', require('./api/router/message/userGroupList'))
app.get('/dev-api/dashboard/message/userGroup/:groupName', require('./api/router/message/userGroupOne'))

app.put('/dev-api/trigger/:type/:word', require('./api/router/trigger/update'))

app.get('/', (req, res) => {
  res.send('Welcome to my simple Express API!')
})

// 啟動服務器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
