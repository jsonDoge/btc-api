require('dotenv').config()
const express = require('express')
const axios = require('axios')

const { env } = process
const app = express()

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/api/v1/price', async (req, res) => {
  const priceUrl = `${env.BTCUSD_SOURCE_URL}/price`

  let response
  try {
    response = await axios.get(priceUrl)
  } catch (e) {
    return res.status(500).json({
      error: {
        message: 'Failed to fetch price',
        reason: e.message,
      },
    })
  }

  const { price } = response?.data?.result || {}

  res.json({ result: { price } })
})

app.listen(env.port, () => {
  console.log(`Listening on http://localhost:${env.port}`)
})
