/**
 * Basic container for ForgotPasswordForm for students. 
 */

import React from 'react'

import { APIRoutes } from '../../shared/routes'

import ForgotPasswordForm from './ForgotPasswordForm'

class StudentForgotPasswordPage extends React.Component {
  render() {
    return (
      <div className='flex center flex-vertical forgot-password-container'>
        <div className='flex flex-vertical'>
          <h2 className='h2 marginTopBot-xxs'>Forgot Password?</h2>
          <ForgotPasswordForm
            userType='student'
            route={APIRoutes.studentsForgotPasswordPath()}
          />
        </div>
      </div>
    )
  }
}

export default StudentForgotPasswordPage
