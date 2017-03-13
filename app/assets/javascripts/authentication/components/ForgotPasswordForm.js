import React, { PropTypes } from 'react'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import request from '../../shared/requests/request'

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      error: '',
      success: '',
    }

    this.updateEmail = this.updateEmail.bind(this)
    this.submitEmail = this.submitEmail.bind(this)
  }

  updateEmail(e) {
    this.setState({
      email: e.target.value
    })
  }

  submitEmail() {
    const path = this.props.route
    const params = { email: this.state.email }
    request.post(path, params, (response) => {
      this.setState({
        success: response.success.message,
      })
    }, (error) => {
      console.log(error)
      this.setState({
        error: error.error.message,
      })
    })
  }

  render() {
    return (
      <div className='forgot-password-form'>
        <div className="forgot-password-form">
          <Input
            name={`${this.props.userType}[email]`}
            label='Email'
            value={this.state.email}
            error={this.state.error}
            success={this.state.success}
            onChange={this.updateEmail}

          />
        </div>

        <div>
          <button
            className='button marginTopBot-xxs forgot-password-button'
            onClick={this.submitEmail}>
            Send password reset email
          </button>
        </div>
      </div>
    )
  }
}

ForgotPasswordForm.propTypes = {
  userType: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
}

export default ForgotPasswordForm
