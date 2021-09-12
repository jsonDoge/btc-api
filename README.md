# BTC price API with caching

BTC current and historical price API with Redis caching.

## Installation

Recommended to generate your own API keys (free), read "Bitcoin price source" section. And place them in .env -> COINAPI_KEY

Only mandatory if you don't want to use docker-compose, otherwise skip to usage -> docker-compose

Install dependencies

```bash
npm i
```

Start redis - use standalone installation or docker:

```bash
 docker run --name some-redis -p 6379:6379 -d redis
 ```

## Usage

if installed manually

```bash
npm start
```

*DOCKER-COMPOSE* (if "Installation" skipped)

In project root run

```bash
docker-compose up
 ```

Default API root: http://localhost:3000

## Endpoints

  - / [Hello!]
  - /api/v1/price [current BTC price]
  - /api/v1/hist [10min intervals latest 100 candles]

## Caching

Redis is used for caching, endpoints cache durations are:
    
  - price - 10 seconds
  - history - 1 minute

*history is not cached for 10min, because the latest candle is constantly being updated.

Caching can be tracked using the Etag and Expire headers.

## Bitcoin price source

The API uses coinAPI REST API underneath for data.

Docs: https://docs.coinapi.io/#md-docs

The free coinAPI limits max API request to 100 per 24h. Endpoints used here are
- historical data [https://rest.coinapi.io/v1/ohlcv/COINBASE_SPOT_BTC_USD/latest?period_id=10MIN]
- current price [https://rest.coinapi.io/v1/exchangerate/BTC/USD]

Free API will help check that caching actually works, otherwise the proxying will get rate limited.

Source API key can be generated here: https://www.coinapi.io/pricing -> "GET A FREE API KEY"

*Default source API key is already committed

## Testing 

There is only one integration test verifying that Etag and Expire match if two consequitive calls are made.
WARNING: Tests require you to have a running redis and they will clear it before running tests.

## Known problems

- API can be improved further by not allowing to DOS an endpoint upon cache is cleared. As it still takes time to fetch new data and update the cache. During that time each request will still reach the proxy.