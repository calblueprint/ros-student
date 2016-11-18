import React from 'react'
import {
  Router,
  Route,
  browserHistory,
  Link
} from 'react-router'
import { render } from 'react-dom'

import '../../stylesheets/bundle/course.scss'

import { RailsRoutes, ReactRoutes } from '../shared/routes'
import { getUser } from '../utils/user_helpers'

import CoursePage from './components/CoursePage'

import Navbar from '../shared/components/widgets/Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar>
          <Link to={ReactRoutes.dashboardPath()}>
            <header className='nav-element logo'>Roots of Success</header>
          </Link>

          <div className="nav-element right">
            <p>{`${getUser().first_name} ${getUser().last_name}`}</p>
            <div className="dropdown-container">
              <Link
                className='dropdown-link'
                to={ReactRoutes.updateAdminPath(getUser().id)}>
                Profile
              </Link>
              <a
                href={RailsRoutes.adminsSignOutPath()}
                data-method="delete"
                className='dropdown-link'
                >Sign out</a>
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
    <Route path={ReactRoutes.rootPath()} component={App}>
      <Route path={ReactRoutes.coursePath()} component={CoursePage} />
    </Route>
  </Router>
), document.getElementById('main-container'))
