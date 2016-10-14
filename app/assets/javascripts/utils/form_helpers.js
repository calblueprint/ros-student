import _ from 'underscore'

import { SERIALIZER } from '../shared/requests/serializer'

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

function getFlashes() {
  const flashes = document.querySelector('meta[name="flash"]')
  if (!flashes) {
    return {}
  }
  return JSON.parse(flashes.content)
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
  return _.reduce(formFields, (result, val, key) => {
    key = SERIALIZER[key] || key;
    result[key] = val.value;
    return result;
  }, {})
}

export {
  getCSRFFieldName,
  getCSRFToken,
  getInputToParams,
  getErrors,
  getFlashes,
  getFormErrors,
  getFormFields,
  mapErrorToFormFields,
}
