/* eslint-disable no-unused-expressions */
require('dotenv').config({})

const axios = require('axios')
const { expect } = require('chai')

const app = require('../../src/app')
const redisClient = require('../../src/redisClient')

const { env } = process

let server

describe('Caching', () => {
  before((done) => {
    redisClient.flushall().then(() => {
      server = app.listen(env.API_PORT, done)
    })
  })

  after((done) => {
    server.close(done)
  })

  it('/price', async () => {
    const res0 = await axios.get(`http://localhost:${env.API_PORT}/api/v1/price`)
    const res1 = await axios.get(`http://localhost:${env.API_PORT}/api/v1/price`)

    expect(res0.headers.etag).to.exist
    expect(res0.headers.expire).to.exist
    expect(res0.headers.etag).to.equal(res1.headers.etag)
    expect(res0.headers.expire).to.equal(res1.headers.expire)
  })

  it('/hist', async () => {
    const res0 = await axios.get(`http://localhost:${env.API_PORT}/api/v1/hist`)
    const res1 = await axios.get(`http://localhost:${env.API_PORT}/api/v1/hist`)

    expect(res0.headers.etag).to.exist
    expect(res0.headers.expire).to.exist
    expect(res0.headers.etag).to.equal(res1.headers.etag)
    expect(res0.headers.expire).to.equal(res1.headers.expire)
  })
})
