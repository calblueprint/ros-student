import _ from 'underscore'

import { SERIALIZER } from '../shared/requests/serializer'

function getCSRFFieldName() {
  return document.querySelector('meta[name="csrf-param"]').content
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').content
}

function getErrors() {
  return JJSON.parse(document.querySelector('meta[name="errors"]').content)
}

function mapErrorToFormFields(error, formFields) {
  const errors = getFormErrors(error.error)
  _.keys(formFields).map((key) => {
    formFields[key].error = errors[key]
  })
  return formFields
}

function getFormErrors(error) {
  if (!error) {
    error = getErrors
  }
  return _.reduce(error.form_errors, (result, val) => {
    const key = _.invert(SERIALIZER)[val.key] || val.key
    result[key] = val.message
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
  getFormErrors,
  mapErrorToFormFields,
}
