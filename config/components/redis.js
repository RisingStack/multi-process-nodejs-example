'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  REDIS_URI: joi.string()
    .uri({ scheme: 'redis' })
    .required(),
  REDIS_DATA_RETENTION_IN_MS: joi.number()
    .default(86400000)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  redis: {
    uri: envVars.REDIS_URI,
    dataRetention: envVars.REDIS_DATA_RETENTION_IN_MS
  }
}

module.exports = config
