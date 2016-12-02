'use strict'

const koa = require('koa')
const middleware = require('./middleware')
const router = require('./router')

const app = koa()

app.use(middleware.parseQuery({ allowDots: true }))
app.use(router.middleware())

module.exports = app
