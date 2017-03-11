import React from 'react'
import {
  RouteHandler,
  Router,
  Route,
  Redirect,
  browserHistory,
  Link
} from 'react-router'
import { render } from 'react-dom'

import '../../stylesheets/bundle/students.scss'

import { RailsRoutes, ReactRoutes } from '../shared/routes'

import StudentProfilePage from './components/StudentProfilePage'
import StudentDashboardPage from './components/StudentDashboardPage'
import CourseOutlinePage from './components/CourseOutlinePage'
import Flash from '../shared/components/widgets/Flash'
import Navbar from '../shared/components/widgets/Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar bundleType="student" />

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
      <Route path={ReactRoutes.studentProfilePath()} component={StudentProfilePage} />
      <Route path={ReactRoutes.dashboardPath()} component={StudentDashboardPage} />
      <Route path={ReactRoutes.courseOutlinePath()} component={CourseOutlinePage} />
      <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath()} />
    </Route>
  </Router>
), document.getElementById('main-container'))
