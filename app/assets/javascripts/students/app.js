import React from 'react'
import { RouteHandler, Router, Route, IndexRoute, browserHistory } from 'react-router'
import { render } from 'react-dom'

import StudentDashboard from './components/StudentDashboard'

render((
  <Router history={browserHistory}>
    <Route path='/dashboard' component={StudentDashboard} />
  </Router>
), document.getElementById('main_container'))