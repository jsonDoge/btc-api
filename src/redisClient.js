const { promisify } = require('util')
const redis = require('redis')

const { env } = process

const redisClient = redis.createClient({
  port: env.REDIS_PORT,
})

redisClient.on('error', (error) => {
  console.error(error)
})

const get = promisify(redisClient.get).bind(redisClient)
const setex = promisify(redisClient.setex).bind(redisClient)

module.exports = {
  get,
  setex,
}
