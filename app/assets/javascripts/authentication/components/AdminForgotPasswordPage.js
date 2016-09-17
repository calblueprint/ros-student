import React from 'react'
import Link from 'react-router'

import ForgotPasswordForm from './ForgotPasswordForm'

class AdminForgotPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Forgot Password?</h1>
        <ForgotPasswordForm userType='admin' path='/admins/password' />
      </div>
    )
  }
}

export default AdminForgotPasswordPage
