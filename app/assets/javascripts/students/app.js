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

import { ReactRoutes } from '../shared/routes'

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
            <p>Dropdown</p>
            <div className="dropdown-container">
              <a className='dropdown-link' href="#">Link 1</a>
              <a className='dropdown-link' href="#">Link 2</a>
              <a className='dropdown-link' href="#">Link 3</a>
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
