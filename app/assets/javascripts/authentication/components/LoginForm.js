import _ from 'underscore'
import React from 'react'

import { getFlashes } from '../../utils/form_helpers'

import Input from '../../shared/components/forms/Input'
import Form from '../../shared/components/forms/Form'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      formFields: {
        email: {
          label: 'Email',
          value: '',
          name: `${this.props.userType}[email]`,
          onChange: _.bind(this.handleChange, this, 'email'),
        },
        password: {
          label: 'Password',
          value: '',
          type: 'password',
          name: `${this.props.userType}[password]`,
          onChange: _.bind(this.handleChange, this, 'password'),
        },
      }
    }
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  renderFields() {
    return (
      _.pairs(this.state.formFields).map((values) => {
        return <Input key={values[0]} {...values[1]} />
      })
    )
  }

  render() {
    const flash = getFlashes()

    return(
      <div>
        <h3>{flash.alert}</h3>

        <Form
          className='login_form'
          id='login_form'
          method='post'
          action={this.props.action}>

          {this.renderFields()}

          <div className='field'>
            <input name='user[remember_me]' type='hidden' value='0' />
            <label htmlFor='user_remember_me'>Remember me</label>
            <input
              id='user_remember_me'
              type='checkbox'
              value='1'
              name={`${this.props.userType}[remember_me]`}
            />
          </div>

          <div className='actions'>
            <input type='submit' name='commit' value='Log in' />
          </div>
        </Form>
      </div>
    )
  }
}

export default LoginForm
