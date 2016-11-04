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
import { getUser } from '../utils/user_helpers'

import UpdateStudentPage from './components/UpdateStudentPage'
import StudentDashboard from './components/StudentDashboard'
import CourseOutlinePage from './components/CourseOutlinePage'

import Navbar from '../shared/components/widgets/Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Link to={ReactRoutes.dashboardPath()}>
            <p className='nav-element logo'>Roots of Success</p>
          </Link>

          <div className="nav-element right">
            <p>{`${getUser().first_name} ${getUser().last_name}`}</p>
            <div className="dropdown-container">
              <Link
                className='dropdown-link'
                to={ReactRoutes.updateStudentPath(getUser().id)}>
                Profile
              </Link>
              <a
                href={RailsRoutes.studentsSignOutPath()}
                data-method="delete"
                className='dropdown-link'
                href="#">Sign out</a>
            </div>
          </div>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path={ReactRoutes.updateStudentPath()} component={UpdateStudentPage} />
      <Route path={ReactRoutes.dashboardPath()} component={StudentDashboard} />
      <Route path={ReactRoutes.courseOutlinePath()} component={CourseOutlinePage} />
      <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath()} />
    </Route>
  </Router>
), document.getElementById('main-container'))
