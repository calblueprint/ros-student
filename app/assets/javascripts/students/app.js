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
import { getUser, observeUser } from '../utils/user_helpers'

import StudentProfilePage from './components/StudentProfilePage'
import StudentDashboardPage from './components/StudentDashboardPage'
import CourseOutlinePage from './components/CourseOutlinePage'

import Navbar from '../shared/components/widgets/Navbar'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: getUser()
    }

    this.observeUser = observeUser(() => {
      this.setState({ user: getUser() })
    })
  }

  componentWillUnmount() {
    this.observeUser.disconnect()
  }

  render() {
    return (
      <div>
        <Navbar>
          <Link to={ReactRoutes.dashboardPath()}>
            <header className='nav-element'>Roots of Success</header>
          </Link>

          <div className="nav-element right">
            <p>{`${getUser().first_name} ${getUser().last_name}`}</p>
            <div className="dropdown-container">
              <Link
                className='dropdown-link'
                to={ReactRoutes.studentProfilePath(getUser().id)}>
                Profile
              </Link>
              <a
                href={RailsRoutes.studentsSignOutPath()}
                data-method="delete"
                className='dropdown-link'
                >Sign out</a>
            </div>
          </div>
        </Navbar>

        <div className='flex center'>
          {this.props.children}
        </div>
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
