import React from 'react'

import { getCSRFFieldName, getCSRFToken, getFlashes } from '../../../utils/form_helpers'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      flash: getFlashes()
    }
  }

  renderAlert() {
    if (this.state.flash.alert) {
      return (
        <div className='marginTopBot-xxs alert'>
          <h3 className='alert-text'>{this.state.flash.alert}</h3>
        </div>
      )
    }
  }

  renderError() {
    if (this.state.flash.error) {
      return (
        <div className='marginTopBot-xxs error'>
          <h3 className='error-text'>{this.state.flash.error}</h3>
        </div>
      )
    }
  }

  render() {
    console.log(this.state.flash)
    return (
      <form
        className={this.props.className}
        id={this.props.id}
        action={this.props.action}
        method={this.props.method}
        acceptCharset='UTF-8'>

        {this.renderError()}
        {this.renderAlert()}

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
  className: 'flex center center-vertical',
  id: '',
  action: 'post',
  method: '',
}

export default Form
