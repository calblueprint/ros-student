import React from 'react'
import { RouteHandler, Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'

import { ReactRoutes } from '../shared/routes'

import AdminDashboard from './components/AdminDashboard'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.dashboardPath()} component={AdminDashboard} />
    <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath} />
  </Router>
), document.getElementById('main_container'))
