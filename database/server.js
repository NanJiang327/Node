const express = require('express')
const

const app = express()
const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`监听端口: ${port}`))

app.get('/', (request, response) => {
  response.send('hello world');
})
