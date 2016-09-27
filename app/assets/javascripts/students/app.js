import React from 'react'
import { RouteHandler, Router, Route, Redirect, browserHistory } from 'react-router'
import { render } from 'react-dom'

import { ReactRoutes } from '../shared/routes'

import StudentDashboard from './components/StudentDashboard'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.dashboardPath} component={StudentDashboard} />
    <Redirect from={ReactRoutes.rootPath} to={ReactRoutes.dashboardPath} />
  </Router>
), document.getElementById('main_container'))
