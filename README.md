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

- /api/v1/price [current BTC price]
- /api/v1/hist [10min intervals last 10 candles]
	
## Notes

The API uses cryptowat.ch REST API underneath for data.

Docs: https://docs.cryptowat.ch/rest-api/

The free cryptowat.ch API limits max API request count by request type (per 24h | per IP):
- ~666 historical data
- ~2000 current price

These parameters will help check that caching works, otherwise the proxying will get rate limited.