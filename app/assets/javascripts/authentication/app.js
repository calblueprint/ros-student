import React from 'react'
import { render } from 'react-dom'
import { RouteHandler, Router, Route, IndexRoute, browserHistory } from 'react-router'

import StudentLoginPage from './components/StudentLoginPage'
import SignUpPage from './components/SignUpPage'
import AdminLoginPage from './components/AdminLoginPage'
import StudentForgotPasswordPage from './components/StudentForgotPasswordPage'
import AdminForgotPasswordPage from './components/AdminForgotPasswordPage'

render((
  <Router history={browserHistory}>
    <Route path='/' name='StudentLoginPage' component={StudentLoginPage} />
    <Route path='/sign_up' name='SignUpPage' component={SignUpPage} />
    <Route path='/admins/sign_in' name='AdminLoginPage' component={AdminLoginPage} />
    <Route path='/admins/forgot_password' name='StudentForgotPasswordPage' component={StudentForgotPasswordPage} />
    <Route path='/students/forgot_password' name='AdminForgotPasswordPage' component={AdminForgotPasswordPage} />
  </Router>
), document.getElementById('main_container'))
