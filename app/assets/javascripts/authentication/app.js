import React from 'react'
import { render } from 'react-dom'
import { RouteHandler, Router, Route, IndexRoute, browserHistory } from 'react-router'

import { ReactRoutes } from '../shared/routes'

import StudentLoginPage from './components/StudentLoginPage'
import SignUpPage from './components/SignUpPage'
import AdminLoginPage from './components/AdminLoginPage'
import StudentForgotPasswordPage from './components/StudentForgotPasswordPage'
import AdminForgotPasswordPage from './components/AdminForgotPasswordPage'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.rootPath} name='StudentLoginPage' component={StudentLoginPage} />
    <Route path={ReactRoutes.studentsSignUpPath} name='SignUpPage' component={SignUpPage} />
    <Route path={ReactRoutes.adminsSignInPath} name='AdminLoginPage' component={AdminLoginPage} />
    <Route path={ReactRoutes.studentsForgotPasswordPath} name='StudentForgotPasswordPage' component={StudentForgotPasswordPage} />
    <Route path={ReactRoutes.adminsForgotPasswordPath} name='AdminForgotPasswordPage' component={AdminForgotPasswordPage} />
  </Router>
), document.getElementById('main_container'))
