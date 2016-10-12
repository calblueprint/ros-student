import React from 'react'

import { RailsRoutes } from '../../shared/routes'

import Form from '../../shared/components/forms/Form'

class SignUpPage extends React.Component {
  renderSignUpForm() {
    return (
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

        <div className='actions'>
          <input type='submit' name='commit' value='Sign up' />
        </div>
      </Form>
    )
  }

  render() {
    return (
      <div>
        <h1 className='h1'>Sign Up Page</h1>
        {this.renderSignUpForm()}
      </div>
    )
  }
}

export default SignUpPage
