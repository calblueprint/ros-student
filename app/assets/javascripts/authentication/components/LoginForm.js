import React from 'react'

import Form from '../../shared/components/Form'

class LoginForm extends React.Component {
  render() {
    return(
      <Form
        className='login_form'
        id='login_form'
        method='post'
        action={this.props.action}>

        <div className='field'>
          <label htmlFor='user_email'>Email</label>
          <br />
          <input
            id='user_email'
            autoFocus='autofocus'
            type='email'
            name={`${this.props.userType}[email]`}
          />
        </div>

        <div className='field'>
          <label htmlFor='user_password'>Password</label><br />
          <input
            id='user_password'
            autoComplete='off'
            type='password'
            name={`${this.props.userType}[password]`}
          />
        </div>

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
    )
  }
}

export default LoginForm
