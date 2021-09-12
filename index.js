require('dotenv').config()

const app = require('./src/app')

const { env } = process

app.listen(env.API_PORT, () => {
  console.log(`Listening on http://localhost:${env.API_PORT}`)
})

module.exports = app
