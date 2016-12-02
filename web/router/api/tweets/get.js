'use strict'

const joi = require('joi')
const redis = require('../../../../models/redis')

const querySchema = joi.object({
  limit: joi.number()
    .default(10),
  offset: joi.number()
    .default(0)
})
  .unknown()
  .required()

function * getTweets () {
  const { error, value: query } = joi.validate(this.query, querySchema)
  if (error) {
    this.throw(400)
  }

  let tweets = yield redis.zrevrangebyscore(redis.SET.tweets, Date.now(), 0, 'LIMIT', query.offset, query.limit)
  tweets = tweets.map((string) => {
    let tweet
    try {
      tweet = JSON.parse(string)
    } catch (ex) {
      /* ignore */
    }

    return tweet
  })

  this.body = tweets
}

module.exports = getTweets
