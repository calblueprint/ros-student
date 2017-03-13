import _ from 'underscore'
import React, { PropTypes } from 'react'

import Input from './Input'

import { getCSRFFieldName, getCSRFToken } from '../../../utils/helpers/form_helpers'

const PASSWORD = 'password'
const TEXT     = 'text'
const IMAGE    = 'image'
const AUDIO    = 'audio'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    if (this.props.onSubmit) {
      this.props.onSubmit(e)
    } else {
      e.preventDefault()
    }
  }

  render() {
    return (
      <form
        className={this.props.className}
        id={this.props.id}
        action={this.props.action}
        method={this.props.method}
        acceptCharset='UTF-8'
        onSubmit={this.props.onSubmit}
      >

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

Form.propTypes = {
  onSubmit: PropTypes.func,
}

Form.defaultProps = {
  className: 'flex center flex-vertical',
  id: '',
  action: 'post',
  method: '',
}

export default Form
