import React from 'react'
import { render } from 'react-dom'
import { Redirect, Router, Route, IndexRoute, browserHistory } from 'react-router'

import '../../stylesheets/bundle/authentication.scss'

import { ReactRoutes } from '../shared/routes'

import DesignPage from './components/DesignPage'
import StudentLoginPage from './components/StudentLoginPage'
import SignUpPage from './components/SignUpPage'
import AdminLoginPage from './components/AdminLoginPage'
import StudentForgotPasswordPage from './components/StudentForgotPasswordPage'
import AdminForgotPasswordPage from './components/AdminForgotPasswordPage'
import StudentResetPasswordPage from './components/StudentResetPasswordPage'
import AdminResetPasswordPage from './components/AdminResetPasswordPage'
import TestingPage from './components/TestingPage'
import Flash from '../shared/components/widgets/Flash'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className='flex center'>
          {this.props.children}
        </div>

        <Flash />
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.rootPath()} component={App}>
      <IndexRoute name='StudentLoginPage' component={StudentLoginPage} />
      <Route path={ReactRoutes.studentsSignUpPath()} name='SignUpPage' component={SignUpPage} />
      <Route path={ReactRoutes.adminsSignInPath()} name='AdminLoginPage' component={AdminLoginPage} />
      <Route path={ReactRoutes.studentsForgotPasswordPath()} name='StudentForgotPasswordPage' component={StudentForgotPasswordPage} />
      <Route path={ReactRoutes.adminsForgotPasswordPath()} name='AdminForgotPasswordPage' component={AdminForgotPasswordPage} />
      <Route path={ReactRoutes.studentsResetPasswordPath()} name='StudentResetPasswordPage' component={StudentResetPasswordPage} />
      <Route path={ReactRoutes.adminsResetPasswordPath()} name='AdminResetPasswordPage' component={AdminResetPasswordPage} />
      <Route path={ReactRoutes.studentsResetPasswordEditPath()} name='StudentResetPasswordPage' component={StudentResetPasswordPage} />
      <Route path={ReactRoutes.adminsResetPasswordEditPath()} name='AdminResetPasswordPage' component={AdminResetPasswordPage} />
      <Route path={ReactRoutes.designPath()} name='DesignPage' component={DesignPage} />
      <Route path='/testing' name='TestingPage' component={TestingPage} />
      <Redirect from={ReactRoutes.studentsRenderPath()} to={ReactRoutes.studentsSignUpPath()} />
    </Route>
  </Router>
), document.getElementById('main-container'))
