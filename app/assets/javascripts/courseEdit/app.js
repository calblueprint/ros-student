import React from 'react'
import {
  Router,
  Route,
  browserHistory,
  Link,
} from 'react-router'
import { render } from 'react-dom'

import { RailsRoutes, ReactRoutes } from '../shared/routes'
import { getUser } from '../utils/user_helpers'

import '../../stylesheets/bundle/course_edit.scss'

import Navbar from '../shared/components/widgets/Navbar'

import CourseEditPage from './components/CourseEditPage'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <a href={RailsRoutes.dashboardPath()}>
            <header className='nav-element logo'>Roots of Success</header>
          </a>
          <div className="nav-element right">
            <p>{`${getUser().first_name} ${getUser().last_name}`}</p>
            <div className="dropdown-container">
              <a
                className='dropdown-link'
                href={RailsRoutes.adminProfilePath(getUser().id)}>
                Profile
              </a>
              <a
                href={RailsRoutes.adminsSignOutPath()}
                data-method="delete"
                className='dropdown-link'
                >Sign out</a>
            </div>
          </div>

          <a
            href={RailsRoutes.codeCsvListPath()}>
            <div className="nav-element marginRight-xl right">Codes</div>
          </a>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}
render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.rootPath()} component={App}>
      <Route path={ReactRoutes.courseEditPath()} component={CourseEditPage} />
    </Route>
  </Router>
), document.getElementById('main-container'))
