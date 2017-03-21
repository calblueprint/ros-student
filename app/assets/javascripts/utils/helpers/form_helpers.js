import _ from 'underscore'

import { SERIALIZER } from '../../shared/requests/serializer'
import { createObserver } from '../observer'

function getCSRFFieldName() {
  return document.querySelector('meta[name="csrf-param"]').content
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').content
}

function getErrors() {
  const errors = document.querySelector('meta[name="errors"]')
  if (!errors) {
    return {}
  }
  return JSON.parse(errors.content)
}

function observeFlashes(callback) {
  return createObserver(callback, 'meta[name="flash"]')
}

function getFlashes() {
  const flashes = document.querySelector('meta[name="flash"]')

  if (!flashes) {
    return {}
  }
  const content = JSON.parse(flashes.content)

  // resetFlash()
  return content
}

function addFlash(type, message) {
  document.querySelector('meta[name="flash"]')
    .setAttribute('content', JSON.stringify({ [type]: message }))
}

function resetFlash() {
  document.querySelector('meta[name="flash"]').setAttribute('content', '{}')
}

/**
  Maps error responses to formField dictionary

  Input:

  formFields:

  {
    myKey: {
      ...
      error: ''
    },
    ...
  }

  error:

  {
    error: {
      message: ...
      form_errors: [
        {
          key: my_key,
          message: message
        },
        ...
      ]
    }
  }

  return:

  {
    myKey: {
      ...
      error: message
    },
    ...
  }
**/
function mapErrorToFormFields(error, formFields) {
  const errors = getFormErrors(error.error)
  _.keys(formFields).map((key) => {
    formFields[key].error = errors[key]
  })
  return formFields
}

/**
  Maps error output to a javascript object using a reverse serializer.

  error:

  {
    message: ...
    form_errors: [
      {
        key: my_key,
        message: message
      },
      ...
    ]
  }

  camelCase:boolean

  return:

  {
    myKey
  }
**/
function getFormErrors(error) {
  if (!error) {
    error = getErrors()
  }

  return _.reduce(error.form_errors, (result, val) => {
    const key = _.invert(SERIALIZER)[val.key] || val.key
    result[key] = val.message
    return result
  }, {})
}

function getFormFields(error) {
  if (!error) {
    error = getErrors()
  }

  return _.reduce(error.form_fields, (result, val) => {
    const key = _.invert(SERIALIZER)[val.key] || val.key

    result[key] = _.reduce(val.fields, (result, val, key) => {
      key = _.invert(SERIALIZER)[key] || key
      result[key] = val
      return result
    }, {})

    return result
  }, {})
}

function getInputToParams(formFields) {
  return camelToSnake(_.mapObject(formFields, (val, key) => val.value))
}

function camelToSnake(object) {
  return _.reduce(object, (result, val, key) => {
    result[SERIALIZER[key] || key] = val;
    return result;
  }, {})
}

function snakeToCamel(object) {
  return _.reduce(object, (result, val, key) => {
    key = _.invert(SERIALIZER)[key] || key
    result[key] = val
    return result
  }, {})
}

export {
  camelToSnake,
  getCSRFFieldName,
  getCSRFToken,
  getErrors,
  getFlashes,
  getFormErrors,
  getFormFields,
  getInputToParams,
  mapErrorToFormFields,
  observeFlashes,
  resetFlash,
  snakeToCamel,
  addFlash,
}
