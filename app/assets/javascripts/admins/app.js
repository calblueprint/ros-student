import React from 'react'
import {
  RouteHandler,
  Router,
  Route,
  Redirect,
  IndexRoute,
  browserHistory,
  Link,
} from 'react-router'

import { render } from 'react-dom'

import '../../stylesheets/bundle/admins.scss'

import { RailsRoutes, ReactRoutes } from '../shared/routes'
import { getUser } from '../utils/user_helpers'

import AdminDashboardPage from './components/AdminDashboardPage'
import UpdateAdminPage from './components/UpdateAdminPage'
import CodeCsvListPage from './components/CodeCsvListPage'

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

          <Link
            to={ReactRoutes.codeCsvListPath()}>
            <div className="nav-element marginRight-xl right">Codes</div>
          </Link>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.rootPath()} component={App}  >
      <Route path={ReactRoutes.dashboardPath()} name='AdminDashboardPage' component={AdminDashboardPage} />
      <Route path={ReactRoutes.updateAdminPath()} name='UpdateAdminPage' component={UpdateAdminPage} />
      <Route path={ReactRoutes.codeCsvListPath()} name='CodeCsvListPage' component={CodeCsvListPage} />
      <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath()} />
    </Route>
  </Router>
), document.getElementById('main-container'))
