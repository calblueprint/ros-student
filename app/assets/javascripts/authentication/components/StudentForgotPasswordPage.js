import React from 'react'

import { RailsRoutes } from '../../shared/routes'

import ForgotPasswordForm from './ForgotPasswordForm'

class StudentForgotPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Forgot Password?</h1>
        <ForgotPasswordForm
          userType='student'
          action={RailsRoutes.studentForgotPasswordPath}
          />
      </div>
    )
  }
}

export default StudentForgotPasswordPage
