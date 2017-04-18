'use strict'

const joi = require('joi')
const compose = require('koa-compose')
const { validator } = require('../../../../middleware')
const redis = require('../../../../../models/redis')

const querySchema = joi.object({
  limit: joi.number()
    .default(10),
  offset: joi.number()
    .default(0)
})
  .unknown()
  .required()

async function getTweets (ctx) {
  ctx.body = await redis.getTweets(ctx.query)
}

module.exports = compose([
  validator({
    query: querySchema
  }),
  getTweets
])
