'use strict'

const trace = require('@risingstack/trace')
const joi = require('joi')
const logger = require('winston')
const config = require('../../config')
const tortoise = require('../../models/tortoise')
const redis = require('../../models/redis')

const messageSchema = joi.object({
  createdAt: joi.date()
    .required(),
  text: joi.string()
    .required(),
  tweeter: joi.string()
    .required()
})
  .required()

tortoise
  .queue(tortoise.QUEUE.tweet)
  .prefetch(1)
  .json()
  .subscribe((msg, ack, nack) => {
    const { error, value } = joi.validate(msg, messageSchema)
    if (error) {
      logger.warn('Social preprocessor invalid message', { msg, error: error.message })
      ack()
      return
    }

    redis.zadd(redis.SET.tweets, value.createdAt.getTime(), JSON.stringify(msg))
      .then(() => {
        logger.debug('Social preprocessor save success', { msg })
        trace.incrementMetric('tweets/saved')
        ack()
      })
      .catch((err) => {
        logger.error('Social preprocessor save error', { error: err })
        nack()
      })
  })

setInterval(() => {
  redis.zremrangebyscore(redis.SET.tweets, 0, Date.now() - config.redis.dataRetention)
}, 60 * 1000)
