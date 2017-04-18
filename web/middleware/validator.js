'use strict'

const joi = require('joi')

function validatorFactory (schemas) {
  return async function validatorMiddleware (ctx, next) {
    ['params', 'query']
      .forEach((partToValidate) => {
        if (schemas[partToValidate]) {
          const validatedObject = joiValidate(ctx[partToValidate], schemas[partToValidate])

          Object.assign(ctx[partToValidate], validatedObject)
        }
      })

    if (schemas.body) {
      ctx.request.body = joiValidate(ctx.request.body, schemas.body)
    }

    await next()
  }
}

function joiValidate (props, schema, options) {
  const validationResult = joi.validate(props, schema, options)
  if (validationResult.error) {
    throw validationResult.error
  }

  return validationResult.value
}

module.exports = validatorFactory
