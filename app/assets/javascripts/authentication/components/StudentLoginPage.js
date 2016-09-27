import React from 'react'
import { Link } from 'react-router'

import { RailsRoutes, ReactRoutes } from '../../shared/routes'

import LoginForm from './LoginForm'

class StudentLoginPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Login Page!</h1>
        <LoginForm userType='student' action='/students/sign_in' />
        <Link to='/students/sign_up'>Sign up</Link>
        <Link to='/students/forgot_password'>Forgot password?</Link>
      </div>
    )
  }
}

export default StudentLoginPage
