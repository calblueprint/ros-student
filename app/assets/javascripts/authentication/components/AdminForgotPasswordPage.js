import React from 'react'
import Link from 'react-router'

import { APIRoutes } from '../../shared/routes'

import ForgotPasswordForm from './ForgotPasswordForm'

class AdminForgotPasswordPage extends React.Component {
  render() {
    return (
      <div className='flex center flex-vertical forgot-password-container'>
        <div className='flex flex-vertical'>
          <h2 className='h2 marginTopBot-xxs'>Forgot Password?</h2>
          <ForgotPasswordForm
            userType='admin'
            route={APIRoutes.adminsForgotPasswordPath()}
          />
        </div>
      </div>
    )
  }
}

export default AdminForgotPasswordPage
