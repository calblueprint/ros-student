import React from 'react'
import { Link } from 'react-router'

import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { Images } from '../../utils/image_helpers'

import LoginForm from './LoginForm'
import RootsLogo from '../../shared/components/widgets/RootsLogo'

class StudentLoginPage extends React.Component {

  render() {
    return (
      <div className='flex center flex-vertical login-container'>
        <div className='flex center flex-vertical login-modal'>
          <RootsLogo size={200} />
          <h2 className='h2 marginTopBot-xxs'>Let's get started.</h2>
          <LoginForm
            userType='student'
            action={RailsRoutes.studentsSignInPath()}
          />

          <Link
            className='marginTop-xs'
            to={ReactRoutes.studentsSignUpPath()}
          >
            Sign up
          </Link>

          <Link
            to={ReactRoutes.studentsForgotPasswordPath()}
          >
            Forgot password?
          </Link>
        </div>
      </div>
    )
  }
}

export default StudentLoginPage
