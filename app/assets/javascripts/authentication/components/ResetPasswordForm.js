import _ from 'underscore'
import React, { PropTypes } from 'react'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'
import { getInputToParams, mapErrorToFormFields } from '../../utils/form_helpers'
import request from '../../shared/requests/request'

class ResetPasswordForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: {
        newPassword: {
          label: 'New Password',
          value: '',
          name: `${this.props.userType}[password]`,
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'newPassword'),
          error: '',
        },
        confirmPassword: {
          label: 'Confirm Password',
          value: '',
          name: `${this.props.userType}[password_confirmation]`,
          type: 'password',
          onChange: _.bind(this.handleChange, this, 'confirmPassword'),
          error: '',
        },
      }
    }

    // this.changePassword = this.changePassword.bind(this)
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  // redirectToLogin() {
  //   const path = this.props.railsRoute

  //   request.get(path, (response) => {

  //   }, (error) => {
  //     console.log(error)
  //   })
  // }

  // changePassword() {
  //   const path = this.props.apiRoute
  //   const params = {
  //     reset_password_token: this.props.resetPasswordToken,
  //     password: this.state.formFields.newPassword.value,
  //     password_confirmation: this.state.formFields.confirmPassword.value,
  //   }
  //   // const params = this.props.userType === 'student' ?
  //   //   {
  //   //     student: getInputToParams(this.state.formFields),
  //   //     reset_password_token: this.props.resetPasswordToken
  //   //   } : {
  //   //     admin: getInputToParams(this.state.formFields),
  //   //     reset_password_token: this.props.resetPasswordToken
  //   //   }

  //   console.log(params)

  //   request.update(path, params, (response) => {
  //     this.redirectToLogin();
  //   }, (error) => {
  //     console.log(error)
  //     // this.setState({
  //     //   formFields: mapErrorToFormFields(error, this.state.formFields)
  //     // })
  //   })
  // }

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
        action={this.props.railsRoute}
        method='post'>
        <input name='_method' type='hidden' value='patch' />
        <input name={this.getResetPasswordTokenName()} type='hidden' value={this.props.reset_password_token} />

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
  apiRoute: PropTypes.string.isRequired,
  resetPasswordToken: PropTypes.string.isRequired,
}

export default ResetPasswordForm
