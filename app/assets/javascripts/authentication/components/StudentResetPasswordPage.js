import React from 'react'

import { RailsRoutes, APIRoutes } from '../../shared/routes'

import ResetPasswordForm from './ResetPasswordForm'

class StudentResetPasswordPage extends React.Component {
  render() {
    return (
      <div className='flex center flex-vertical reset-password-container'>
        <div className='flex flex-vertical'>
          <h2 className='h2 marginTopBot-xxs'>Change Password</h2>
          <ResetPasswordForm
            userType='student'
            railsRoute={RailsRoutes.studentsSignInPath()}
            apiRoute={APIRoutes.studentsResetPasswordPath()}
            resetPasswordToken={this.props.location.query.reset_password_token}
          />
        </div>
      </div>
    )
  }
}

export default StudentResetPasswordPage
