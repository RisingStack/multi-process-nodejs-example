'use strict'

const Tortoise = require('tortoise')
const logger = require('winston')
const config = require('../../config')

const tortoise = new Tortoise(config.rabbitmq.uri)

tortoise.on(Tortoise.EVENTS.CONNECTIONCLOSED, () => {
  logger.error('RabbitMQ connection closed')
})

tortoise.on(Tortoise.EVENTS.CONNECTIONDISCONNECTED, () => {
  logger.error('RabbitMQ connection disconnected')
})

tortoise.on(Tortoise.EVENTS.CONNECTIONERROR, (err) => {
  logger.error('RabbitMQ connection error', err)
})

module.exports = Object.assign(tortoise, {
  QUEUE: {
    tweet: 'tweet'
  }
})
