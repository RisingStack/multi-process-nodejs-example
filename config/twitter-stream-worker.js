'use strict'

const common = require('./components/common')
const logger = require('./components/logger')
const rabbitmq = require('./components/rabbitmq')
const twitter = require('./components/twitter')

module.exports = Object.assign({}, common, logger, rabbitmq, twitter)
