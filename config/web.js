'use strict'

const common = require('./components/common')
const logger = require('./components/logger')
const redis = require('./components/redis')
const server = require('./components/server')

module.exports = Object.assign({}, common, logger, redis, server)
