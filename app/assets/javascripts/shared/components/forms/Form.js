import _ from 'underscore'
import React from 'react'

import Input from './Input'

import { getCSRFFieldName, getCSRFToken, getFlashes } from '../../../utils/form_helpers'

const PASSWORD = 'password'
const TEXT     = 'text'
const IMAGE    = 'image'
const AUDIO    = 'audio'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flash: getFlashes()
    }
  }

  renderFlashes() {
    return _.keys(this.state.flash).map((key) => {
      return (
        <div key={key} className={`marginTopBot-xxs flash ${key}`}>
          <h3 className={`flash ${key}-text`}>{this.state.flash[key]}</h3>
        </div>
      )
    })
  }


  render() {
    return (
      <form
        className={this.props.className}
        id={this.props.id}
        action={this.props.action}
        method={this.props.method}
        acceptCharset='UTF-8'>

        {this.renderFlashes()}

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
