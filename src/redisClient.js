const { promisify } = require('util')
const redis = require('redis')

const { env } = process

const redisClient = redis.createClient(env.REDIS_URL)

redisClient.on('error', (error) => {
  console.error(error)
})

const get = promisify(redisClient.get).bind(redisClient)
const setex = promisify(redisClient.setex).bind(redisClient)
const flushall = promisify(redisClient.flushall).bind(redisClient)

module.exports = {
  get,
  setex,
  flushall,
}
