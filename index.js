require('dotenv').config()
const express = require('express')
const axios = require('axios').default

const { env } = process
const app = express()
axios.defaults.headers.common['X-CoinAPI-Key'] = env.API_KEY

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/api/v1/price', async (req, res) => {
  const priceUrl = `${env.BTCUSD_SOURCE_URL}/exchangerate/BTC/USD`

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

  const { rate } = response?.data || {}

  res.json({ result: { price: rate } })
})

app.get('/api/v1/hist', async (req, res) => {
  const histUrl = `${env.BTCUSD_SOURCE_URL}/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=10MIN`

  let response
  try {
    response = await axios.get(histUrl)
  } catch (e) {
    return res.status(500).json({
      error: {
        message: 'Failed to fetch hist',
        reason: e.message,
      },
    })
  }

  const hist = response?.data

  res.json({ result: { hist } })
})

app.listen(env.port, () => {
  console.log(`Listening on http://localhost:${env.port}`)
})
