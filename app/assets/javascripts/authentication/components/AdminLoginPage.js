import React from 'react'
import { Link } from 'react-router'

import { ReactRoutes, RailsRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import LoginForm from './LoginForm'

class AdminLoginPage extends React.Component {
  render() {
    return (
      <div className='flex center flex-vertical login-container'>
        <div className='flex center flex-vertical login-modal'>
          <img className='login-logo' src={Images.rootsLogo} />
          <h2 className='h2 marginTopBot-xxs'>Admin Login</h2>
          <LoginForm userType='admin' action={RailsRoutes.adminsSignInPath()} />
          <Link className='marginTop-xxs' to={ReactRoutes.adminsForgotPasswordPath()}>Forgot password?</Link>
        </div>
      </div>
    )
  }
}

export default AdminLoginPage
