# BTC price API with caching

BTC current and historical price API with Redis caching.

## Installation

```bash
npm i
```

## Usage

```bash
npm start
```

## Endpoints

- / [Hello!]
- /api/v1/price [current BTC price]
- /api/v1/hist [10min intervals last 10 candles]

## Bitcoin price source

The API uses coinAPI REST API underneath for data.

Docs: https://docs.coinapi.io/#md-docs

The free coinAPI limits max API request to 100 per 24h. Endpoints used here are
- historical data [https://rest.coinapi.io/v1/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=10MIN]
- current price [https://rest.coinapi.io/v1/exchangerate/BTC/USD]

Free API will help check that caching actually works, otherwise the proxying will get rate limited.