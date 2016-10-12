import _ from 'underscore'
import React from 'react'

import { RailsRoutes, APIRoutes } from '../../shared/routes'
import { getInputToParams } from '../../utils/form_helpers'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import Input from '../../shared/components/forms/Input'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      verified: false,
      code: {},
      formFields: {
        key: {
          label: 'Code',
          value: '',
          onChange: _.bind(this.handleChange, this, 'key'),
          error: '',
        },
      }
    }
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  makeVerifyRequest(e) {
    e.preventDefault()

    const path = APIRoutes.verifyCodePath()
    const params = { code: getInputToParams(this.state.formFields) }

    request.post(path, params, (response) => {
      this.setState({ verified: true, code: response.code })
    }, (error) => {
      console.log('error')
    })
  }

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return <Input key={values[0]} {...values[1]} />
      })
    )
  }

  renderCodeForm() {
    return (
      <div>
        <h1 className='h1'>Enter 8 Digit Code</h1>
        <Form>
          {this.renderFields()}
          <div className='actions'>
            <input type='submit' value='Update user' onClick={this.makeVerifyRequest.bind(this)} />
          </div>
        </Form>
      </div>
    )
  }

  renderSignUpForm() {
    return (
      <div>
        <h1 className='h1'>Sign Up Page</h1>
        <Form
          className='sign_up_form'
          id='sign_up_form'
          action={RailsRoutes.studentsSignUpPath()}
          method='post'>

          <div className='field'>
            <label htmlFor='student_first_name'>First Name</label><br />
            <input name='student[first_name]' id='student_first_name' />
          </div>

          <div className='field'>
            <label htmlFor='student_last_name'>Last Name</label><br />
            <input name='student[last_name]' id='student_last_name' />
          </div>

          <div className='field'>
            <label htmlFor='student_username'>Username</label><br />
            <input name='student[username]' id='student_username' />
          </div>

          <div className='field'>
            <label htmlFor='student_email'>Email</label><br />
            <input type='email' name='student[email]' id='student_email' />
          </div>

          <div className='field'>
            <label htmlFor='student_password'>Password </label>
            <em>(8 characters minimum)</em>
            <br />
            <input autoComplete='off' type='password' name='student[password]' id='student_password' />
          </div>

          <div className='field'>
            <label htmlFor='student_password_confirmation'>Password confirmation</label><br />
            <input autoComplete='off' type='password' name='student[password_confirmation]' id='student_password_confirmation' />
          </div>

          <input type='hidden' name='code[key]' value={this.state.code.key} />

          <div className='actions'>
            <input type='submit' name='commit' value='Sign up' />
          </div>
        </Form>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.state.verified ?
          this.renderSignUpForm() :
          this.renderCodeForm()}
      </div>
    )
  }
}

export default SignUpPage
