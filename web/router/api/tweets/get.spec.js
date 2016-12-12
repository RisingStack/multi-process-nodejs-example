'use strict'

const request = require('super-request')
const expect = require('chai').expect
const redis = require('../../../../models/redis')
const server = require('../../../server')

const url = '/api/v1/tweets'
describe(`GET ${url}`, () => {
  const now = Date.now()
  const tweets = [{
    text: 'text',
    tweeter: 'tweeter',
    createdAt: now
  }]

  beforeEach(function () {
    this.sandbox.useFakeTimers(now)

    this.sandbox.stub(redis, 'zrevrangebyscore')
      .returns(Promise.resolve(tweets.map((tweet) => JSON.stringify(tweet))))
  })

  it('should return the tweets', function * () {
    const response = yield request(server.listen())
      .get(url)
      .qs({
        offset: 9,
        limit: 3
      })
      .json(true)
      .expect(200)
      .end()

    expect(response.body).to.eql(tweets)
    expect(redis.zrevrangebyscore).to.have.been.calledWith(redis.SET.tweets, now, 0, 'LIMIT', 9, 3)
  })
})
