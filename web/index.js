'use strict'

const http = require('http')
const promisify = require('es6-promisify')
const logger = require('winston')
const config = require('../config')
const app = require('./server')

const server = http.createServer(app.callback())

const serverListen = promisify(server.listen, server)
serverListen(config.server.port)
  .then(() => logger.info(`App is listening on port ${config.server.port}`))
  .catch((err) => {
    logger.error('Error happened during server start', err)
    process.exit(1)
  })
