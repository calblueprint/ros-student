import React from 'react'
import { Link } from 'react-router'


import LoginForm from './LoginForm'

class StudentLoginPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Login Page!</h1>
        <LoginForm userType='student' action='/students/sign_in' />
        <Link to='/admins/forgot_password'>Sign in</Link>
        <Link to='/admins/forgot_password'>Forgot password?</Link>
      </div>
    )
  }
}

export default StudentLoginPage
