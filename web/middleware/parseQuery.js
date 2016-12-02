'use strict'

const qs = require('qs')

function parseQueryFactory (options) {
  return function * parseQuery (next) {
    this.query = qs.parse(this.querystring, options)
    yield next
  }
}

module.exports = parseQueryFactory
