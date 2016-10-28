import React from 'react'
import { RouteHandler, Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'

import { ReactRoutes } from '../shared/routes'

import AdminDashboardPage from './components/AdminDashboardPage'
import UpdateAdminPage from './components/UpdateAdminPage'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.dashboardPath()} name='AdminDashboardPage' component={AdminDashboardPage} />
    <Route path={ReactRoutes.updateAdminPath()} name='UpdateAdminPage' component={UpdateAdminPage} />
    <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath()} />
  </Router>
), document.getElementById('main-container'))
