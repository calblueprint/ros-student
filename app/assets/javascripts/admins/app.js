import React from 'react'
import { RouteHandler, Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'

import AdminDashboard from './components/AdminDashboard'

render((
  <Router history={browserHistory}>
    <Route path='/dashboard' component={AdminDashboard} />
  </Router>
), document.getElementById('main_container'))
