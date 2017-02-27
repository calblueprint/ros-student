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
import AdminProfilePage from './components/AdminProfilePage'
import CodeCsvListPage from './components/CodeCsvListPage'
import ExportImportPage from './components/ExportImportPage'
import UsersListPage from './components/UsersListPage'

import Navbar from '../shared/components/widgets/Navbar'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar userType="admin">
          <Link
            to={ReactRoutes.codeCsvListPath()}>
            <div className="nav-element marginRight-xl right">Codes</div>
          </Link>

          <Link
            to={ReactRoutes.courseToolsPath()}>
            <div className="nav-element marginRight-xl right">Tools</div>
          </Link>

          <Link
            to={ReactRoutes.usersListPath()}>
            <div className="nav-element marginRight-xl right">Users</div>
          </Link>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.rootPath()} component={App}>
      <Route path={ReactRoutes.dashboardPath()} name='AdminDashboardPage' component={AdminDashboardPage} />
      <Route path={ReactRoutes.adminProfilePath()} name='AdminProfilePage' component={AdminProfilePage} />
      <Route path={ReactRoutes.codeCsvListPath()} name='CodeCsvListPage' component={CodeCsvListPage} />
      <Route path={ReactRoutes.courseToolsPath()} name='ExportImportPage' component={ExportImportPage} />
      <Route path={ReactRoutes.usersListPath()} name='UsersListPath' component={UsersListPage} />
      <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath()} />
    </Route>
  </Router>
), document.getElementById('main-container'))
