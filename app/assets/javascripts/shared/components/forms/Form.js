import React from 'react'

import { getCSRFFieldName, getCSRFToken, getFlashes } from '../../../utils/form_helpers'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flash: getFlashes()
    }
  }

  render() {
    return (
      <form
        className={this.props.className}
        id={this.props.id}
        action={this.props.action}
        method={this.props.method}
        acceptCharset='UTF-8'>

        <h3>{this.state.flash.alert}</h3>
        <h3>{this.state.flash.error}</h3>

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
  class: '',
  id: '',
  action: 'post',
  method: '',
}

export default Form
