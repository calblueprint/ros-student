import _ from 'underscore'
import React from 'react'

import { RailsRoutes, APIRoutes } from '../../shared/routes'
import { getInputToParams, getFormErrors, getFormFields, getErrors } from '../../utils/form_helpers'
import { Images } from '../../utils/image_helpers'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props)

    const formErrors = getFormErrors()
    const formFields = {
      code: getFormFields().code || {},
      student: getFormFields().student || {}
    }

    this.state = {
      verified: !_.isEmpty(formErrors),
      codeFormFields: {
        key: {
          label: 'Code',
          value: formFields.code.key,
          onChange: _.bind(this.handleCodeChange, this, 'key'),
          error: '',
        },
      },
      signUpFormFields: {
        firstName: {
          label: 'First Name',
          value: formFields.student.firstName,
          name: 'student[first_name]',
          onChange: _.bind(this.handleSignUpChange, this, 'firstName'),
          error: formErrors.firstName,
        },
        lastName: {
          label: 'Last Name',
          value: formFields.student.lastName,
          name: 'student[last_name]',
          onChange: _.bind(this.handleSignUpChange, this, 'lastName'),
          error: formErrors.lastName,
        },
        username: {
          label: 'Username',
          value: formFields.student.username,
          name: 'student[username]',
          onChange: _.bind(this.handleSignUpChange, this, 'username'),
          error: formErrors.username,
        },
        email: {
          label: 'Email',
          value: formFields.student.email,
          name: 'student[email]',
          onChange: _.bind(this.handleSignUpChange, this, 'email'),
          error: formErrors.email,
        },
        newPassword: {
          label: 'Password',
          value: formFields.student.newPassword,
          name: 'student[password]',
          type: 'password',
          onChange: _.bind(this.handleSignUpChange, this, 'newPassword'),
          error: formErrors.newPassword,
        },
        confirmPassword: {
          label: 'Confirm Password',
          value: formFields.student.confirmPassword,
          name: 'student[password_confirmation]',
          type: 'password',
          onChange: _.bind(this.handleSignUpChange, this, 'confirmPassword'),
          error: formErrors.confirmPassword,
        },
      }
    }
  }

  handleCodeChange(attr, e) {
    const codeFormFields = this.state.codeFormFields
    codeFormFields[attr].value = e.target.value
    this.setState({ codeFormFields: codeFormFields })
  }

  handleSignUpChange(attr, e) {
    const signUpFormFields = this.state.signUpFormFields
    signUpFormFields[attr].value = e.target.value
    this.setState({ signUpFormFields: signUpFormFields })
  }

  makeVerifyRequest(e) {
    e.preventDefault()

    const path = APIRoutes.verifyCodePath()
    const params = { code: getInputToParams(this.state.codeFormFields) }

    request.post(path, params, (response) => {
      this.setState({ verified: true })
    }, (error) => {
      const codeFormFields = this.state.codeFormFields
      codeFormFields.key.error = 'is invalid'
      this.setState({ codeFormFields: codeFormFields })
    })
  }

  renderFields(fields) {
    return (
      _.pairs(fields).map((values) => {
        return <Input key={values[0]} {...values[1]} />
      })
    )
  }

  renderCodeForm() {
    return (
      <div className='flex center flex-vertical code-modal'>
        <h2 className='h2 marginTopBot-xxs'>Enter 8 Digit Code</h2>
        <Form>
          <div className='marginTopBot-xxs'>
            {this.renderFields(this.state.codeFormFields)}
          </div>
          <input
            className='button marginTopBot-xxs'
            type='submit'
            value='Update user'
            onClick={this.makeVerifyRequest.bind(this)}
          />
        </Form>
      </div>
    )
  }

  renderSignUpForm() {
    return (
      <div className='flex center flex-vertical'>
        <h2 className='h2 marginTopBot-xxs'>Getting Started</h2>
        <Form
          action={RailsRoutes.studentsSignUpPath()}
          method='post'>

          {this.renderFields(this.state.signUpFormFields)}

          <input
            type='hidden'
            name='code[key]'
            value={this.state.codeFormFields.key.value} />

          <input
            className='button marginTopBot-xxs'
            type='submit'
            name='commit'
            value='Sign up' />
        </Form>
      </div>
    )
  }

  render() {
    return (
      <div className='flex center flex-vertical sign-up-container'>
        <div className='flex center flex-vertical'>
          <img className='login-logo' src={Images.rootsLogo} />
        </div>
        {this.state.verified ?
          this.renderSignUpForm() :
          this.renderCodeForm()}
      </div>
    )
  }
}

export default SignUpPage
