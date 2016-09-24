import React from 'react'

import { RailsRoutes } from '../../shared/routes'

import Form from '../../shared/components/Form'

class SignUpPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Sign Up Page</h1>
        <Form
          className='sign_up_form'
          id='sign_up_form'
          action={RailsRoutes.studentsSignUpPath}
          method='post'>

          <div className='field'>
            <label htmlFor='student_email'>Email</label><br />
            <input autoFocus='autofocus' type='email' name='student[email]' id='student_email' />
          </div>

          <div className='field'>
            <label htmlFor='student_password'>Password</label>
            <em>(8 characters minimum)</em>
            <br />
            <input autoComplete='off' type='password' name='student[password]' id='student_password' />
          </div>

          <div className='field'>
            <label htmlFor='student_password_confirmation'>Password confirmation</label><br />
            <input autoComplete='off' type='password' name='student[password_confirmation]' id='student_password_confirmation' />
          </div>

          <div className='actions'>
            <input type='submit' name='commit' value='Sign up' />
          </div>
        </Form>
      </div>
    )
  }
}

export default SignUpPage
