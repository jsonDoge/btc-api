require('dotenv').config()
const express = require('express')
const axios = require('axios').default

const { getErrorObj } = require('./src/utils')
const redisClient = require('./src/redisClient')

const { env } = process
const app = express()
axios.defaults.headers.common['X-CoinAPI-Key'] = env.CONAPI_KEY

app.get('/', (req, res) => {
  res.send('Hello!')
})

app.get('/api/v1/price', async (req, res) => {
  const cachedPrice = JSON.parse(await redisClient.get('price'))

  if (cachedPrice) {
    return res.json({ result: { price: cachedPrice } })
  }

  const priceUrl = `${env.COINAPI_URL}/exchangerate/BTC/USD`

  let response
  try {
    response = await axios.get(priceUrl)
  } catch (e) {
    return res
      .status(500)
      .json(getErrorObj('Failed to fetch price', e.message))
  }

  const { rate: price } = response?.data || {}
  if (!price) {
    return res
      .status(500)
      .json(getErrorObj('Failed to fetch price', 'Unknown'))
  }

  await redisClient.setex('price', env.PRICE_CACHE_SECS, price)

  res.json({ result: { price } })
})

app.get('/api/v1/hist', async (req, res) => {
  const cachedHist = JSON.parse(await redisClient.get('hist'))

  if (cachedHist) {
    return res.json({ result: { hist: cachedHist } })
  }

  const histUrl = `${env.COINAPI_URL}/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=10MIN`

  let response
  try {
    response = await axios.get(histUrl)
  } catch (e) {
    return res
      .status(500)
      .json(getErrorObj('Failed to fetch history', e.message))
  }

  const hist = response?.data
  if (!hist || !Array.isArray(hist)) {
    return res
      .status(500)
      .json(getErrorObj('Failed to fetch history', 'Unknown'))
  }

  await redisClient.setex('hist', env.HIST_CACHE_SECS, JSON.stringify(hist))

  res.json({ result: { hist } })
})

app.listen(env.API_PORT, () => {
  console.log(`Listening on http://localhost:${env.API_PORT}`)
})
