'use strict'

const Koa = require('koa')
const Boom = require('boom')
const middleware = require('./middleware')
const router = require('./router')

const app = new Koa()

app.use(middleware.parseQuery({ allowDots: true }))
app.use(router.middleware())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),    // eslint-disable-line new-cap
  methodNotAllowed: () => new Boom.methodNotAllowed() // eslint-disable-line new-cap
}))

module.exports = app
