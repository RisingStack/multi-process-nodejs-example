'use strict'

const Redis = require('ioredis')
const config = require('../../config')

const redis = new Redis(config.redis.uri)

module.exports = Object.assign(redis, {
  SET: {
    tweets: 'tweets'
  }
})
