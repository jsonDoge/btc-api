# BTC price API with caching

BTC current and historical price API with Redis caching.

## Installation

Install dependencies

```bash
npm i
```

Start redis - use standalone installation or use docker:

```bash
 docker run --name some-redis -p 6379:6379 -d redis
 ```

## Usage

```bash
npm start
```

## Endpoints

  - / [Hello!]
  - /api/v1/price [current BTC price]
  - /api/v1/hist [10min intervals latest 100 candles]

## Caching

Redis is used for caching, endpoints cache durations are:
    
  - price - 10 seconds
  - history - 1 minute

*history is not cached for 10min, because the latest candle is constantly being updated.

## Bitcoin price source

The API uses coinAPI REST API underneath for data.

Docs: https://docs.coinapi.io/#md-docs

The free coinAPI limits max API request to 100 per 24h. Endpoints used here are
- historical data [https://rest.coinapi.io/v1/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=10MIN]
- current price [https://rest.coinapi.io/v1/exchangerate/BTC/USD]

Free API will help check that caching actually works, otherwise the proxying will get rate limited.