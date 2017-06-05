/**
 * Entry point into the admin application. Students must use StudentLoginPage.
 */

import React from 'react'
import { Link } from 'react-router'

import { ReactRoutes, RailsRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'

import LoginForm from './LoginForm'
import RootsLogo from '../../shared/components/widgets/RootsLogo'

class AdminLoginPage extends React.Component {

  render() {
    return (
      <div className='flex center flex-vertical login-container'>
        <div className='flex center flex-vertical login-modal'>
          <RootsLogo size={200} />
          <h2 className='h2 marginTopBot-xxs'>Admin Login</h2>
          <LoginForm userType='admin' action={RailsRoutes.adminsSignInPath()} />
          <Link
            className='marginTop-xxs'
            to={ReactRoutes.adminsForgotPasswordPath()}
          >
            Forgot password?
          </Link>

          <a
            href={RailsRoutes.studentsSignInPath()}
            className='switch-portal-left'
          >
            <i className='fa fa-long-arrow-left' aria-hidden="true"></i>
            <span className='switch-portal-text-left'>To Student Portal</span>
          </a>
        </div>
      </div>
    )
  }
}

export default AdminLoginPage
