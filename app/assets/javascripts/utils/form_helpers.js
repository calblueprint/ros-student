import _ from 'underscore'

import { MAPPER } from '../shared/requests/serializer'

function getCSRFFieldName() {
  return document.querySelector('meta[name="csrf-param"]').content
}

function getCSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').content
}

function getInputToParams(formFields) {
  return _.reduce(formFields, function(result, val, key) {
    key = MAPPER[key] || key;
    result[key] = val.value;
    return result;
  }, {})
}

export {
  getCSRFFieldName,
  getCSRFToken,
  getInputToParams,
}
