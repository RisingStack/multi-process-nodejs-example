'use strict'

const request = require('super-request')
const redis = require('../../../../../models/redis')
const server = require('../../../../server')

const url = '/api/v1/tweets'
describe(`GET ${url}`, () => {
  const tweets = [{
    text: 'text',
    tweeter: 'tweeter',
    createdAt: new Date().toISOString()
  }]

  beforeEach(() => {
    redis.getTweets = jest.fn(async () => tweets)
  })

  it('should return the tweets', async () => {
    const response = await request(server.listen())
      .get(url)
      .qs({
        offset: 9,
        limit: 3
      })
      .json(true)
      .expect(200)
      .end()

    expect(response.body).toEqual(tweets)
    expect(redis.getTweets).toBeCalledWith({ offset: 9, limit: 3 })
  })
})
