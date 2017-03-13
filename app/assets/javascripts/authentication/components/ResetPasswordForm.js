import _ from 'underscore'
import React, { PropTypes } from 'react'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import request from '../../shared/requests/request'
import { getErrors, getFormErrors, getFormFields } from '../../utils/helpers/form_helpers'


class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)

    const formErrors = getFormErrors()

    console.log(formErrors)

    this.state = {
      formFields: {
        newPassword: {
          label: 'New Password',
          value: '',
          name: `${this.props.userType}[password]`,
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'newPassword'),
          error: formErrors.newPassword,
        },
        confirmPassword: {
          label: 'Confirm Password',
          value: '',
          name: `${this.props.userType}[password_confirmation]`,
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'confirmPassword'),
          error: formErrors.confirmPassword,
        },
      }
    }
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  getResetPasswordTokenName() {
    return `${this.props.userType}[reset_password_token]`
  }

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return <Input key={values[0]} {...values[1]} />
      })
    )
  }

  render() {
    return (
      <Form
        action={`${this.props.railsRoute}?reset_password_token=${this.props.resetPasswordToken}`}
        method='post'>
        <input name='_method' type='hidden' value='patch' />
        <input name={this.getResetPasswordTokenName()} type='hidden' value={this.props.resetPasswordToken} />

        <div className='reset-password-form'>
          <div className="reset-password-form">
            {this.renderFields()}
          </div>

          <input
            className='button marginTopBot-xxs reset-password-button'
            type='submit'
            name='commit'
            value='Change my password' />
        </div>

      </Form>
    )
  }
}

ResetPasswordForm.propTypes = {
  userType: PropTypes.string.isRequired,
  railsRoute: PropTypes.string.isRequired,
  resetPasswordToken: PropTypes.string.isRequired,
}

export default ResetPasswordForm
