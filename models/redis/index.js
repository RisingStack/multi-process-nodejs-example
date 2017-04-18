'use strict'

const redis = require('./redis')

async function getTweets ({ offset, limit } = {}) {
  const tweets = await redis.zrevrangebyscore(redis.SET.tweets, Date.now(), 0, 'LIMIT', offset, limit)
  return tweets
    .map((string) => {
      try {
        return JSON.parse(string)
      } catch (ex) {
        /* ignore */
      }

      return undefined
    })
    .filter(Boolean)
}

async function addTweet (tweet) {
  return redis.zadd(redis.SET.tweets, tweet.createdAt.getTime(), JSON.stringify(tweet))
}

module.exports = Object.assign(redis, {
  getTweets,
  addTweet
})
