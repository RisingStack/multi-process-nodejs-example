'use strict'

process.env.PORT = 3000
process.env.REDIS_URI = 'redis://localhost'

const winston = require('winston')
const config = require('../config')

beforeAll(() => {
  // we want to have logger.test() without flooding the console with other levels' messages
  winston.setLevels({
    debug: 5,
    info: 4,
    warning: 3,
    error: 2,
    critical: 1,
    test: 0
  })
  winston.addColors({
    debug: 'green',
    info: 'cyan',
    warn: 'yellow',
    error: 'red',
    critical: 'red',
    test: 'blue'
  })
  winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, { level: config.logger.level, colorize: true })
})
