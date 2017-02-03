import _ from 'underscore'
import React from 'react'

import Input from './Input'
import Flash from './Flash'

import { getCSRFFieldName, getCSRFToken } from '../../../utils/form_helpers'

const PASSWORD = 'password'
const TEXT     = 'text'
const IMAGE    = 'image'
const AUDIO    = 'audio'

class Form extends React.Component {
  render() {
    return (
      <form
        className={this.props.className}
        id={this.props.id}
        action={this.props.action}
        method={this.props.method}
        acceptCharset='UTF-8'>

        <Flash />

        <input type='hidden' name='utf8' value='&#x2713;' />

        <input
          type='hidden'
          name={getCSRFFieldName()}
          value={getCSRFToken()} />

        {this.props.children}
      </form>
    )
  }
}

Form.defaultProps = {
  className: 'flex center flex-vertical',
  id: '',
  action: 'post',
  method: '',
}

export default Form
