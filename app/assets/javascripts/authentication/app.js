import React from 'react'
import { render } from 'react-dom'
import { Redirect, Router, Route, browserHistory } from 'react-router'

import '../../stylesheets/bundle/authentication.scss'

import { ReactRoutes } from '../shared/routes'

import DesignPage from './components/DesignPage'
import StudentLoginPage from './components/StudentLoginPage'
import SignUpPage from './components/SignUpPage'
import AdminLoginPage from './components/AdminLoginPage'
import StudentForgotPasswordPage from './components/StudentForgotPasswordPage'
import AdminForgotPasswordPage from './components/AdminForgotPasswordPage'
import TestingPage from './components/TestingPage'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.rootPath()} name='StudentLoginPage' component={StudentLoginPage} />
    <Route path={ReactRoutes.studentsSignUpPath()} name='SignUpPage' component={SignUpPage} />
    <Route path={ReactRoutes.adminsSignInPath()} name='AdminLoginPage' component={AdminLoginPage} />
    <Route path={ReactRoutes.studentsForgotPasswordPath()} name='StudentForgotPasswordPage' component={StudentForgotPasswordPage} />
    <Route path={ReactRoutes.adminsForgotPasswordPath()} name='AdminForgotPasswordPage' component={AdminForgotPasswordPage} />
    <Route path={ReactRoutes.designPath()} name='DesignPage' component={DesignPage} />
    <Route path='/testing' name='TestingPage' component={TestingPage} />
    <Redirect from={ReactRoutes.studentsRenderPath()} to={ReactRoutes.studentsSignUpPath()} />
  </Router>
), document.getElementById('main_container'))
