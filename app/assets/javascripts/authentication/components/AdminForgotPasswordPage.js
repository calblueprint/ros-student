import React from 'react'
import Link from 'react-router'

import { RailsRoutes } from '../../shared/routes'

import ForgotPasswordForm from './ForgotPasswordForm'

class AdminForgotPasswordPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Forgot Password?</h1>
        <ForgotPasswordForm
          userType='admin'
          path={RailsRoutes.adminsForgotPasswordPath}
        />
        <Link to={ReactRoutes.adminsForgotPasswordPath}>Forgot password?</Link>
      </div>
    )
  }
}

export default AdminForgotPasswordPage
