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
        <Navbar userType="admin">
          <a href={RailsRoutes.codeCsvListPath()}>
            <div className="nav-element marginRight-xl right">Codes</div>
          </a>

          <a href={ReactRoutes.courseToolsPath()}>
            <div className="nav-element marginRight-xl right">Tools</div>
          </a>

          <a href={ReactRoutes.usersListPath()}>
            <div className="nav-element marginRight-xl right">Users</div>
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
