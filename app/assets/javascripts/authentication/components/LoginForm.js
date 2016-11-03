import _ from 'underscore'
import React from 'react'

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
    return(
      <div>
        <Form
          method='post'
          action={this.props.action}>

          <div className='login-form'>
            {this.renderFields()}
          </div>

          <input className='marginTopBot-xs button' type='submit' name='commit' value='Log in' />
        </Form>
      </div>
    )
  }
}

export default LoginForm
