import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'

import { ReactRoutes } from '../shared/routes'

import CoursePage from './components/StudentDashboard'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.coursePath()} component={CoursePage} />
  </Router>
), document.getElementById('main_container'))
