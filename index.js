require('dotenv').config()
const express = require('express')

const { env } = process
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(env.port, () => {
  console.log(`Listening on http://localhost:${env.port}`)
})
