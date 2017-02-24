import React from 'react'
import {
  Router,
  Route,
  browserHistory,
  Link,
} from 'react-router'
import { render } from 'react-dom'

import { RailsRoutes, ReactRoutes } from '../shared/routes'
import { getUser } from '../utils/helpers/user_helpers'

import '../../stylesheets/bundle/course_edit.scss'

import Navbar from '../shared/components/widgets/Navbar'

import CourseEditPage from './components/CourseEditPage'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar bundleType="courseEdit">
          <a href={RailsRoutes.codeCsvListPath()}>
            <div className="nav-element right">Codes</div>
          </a>

          <a href={ReactRoutes.courseToolsPath()}>
            <div className="nav-element right">Tools</div>
          </a>

          <a href={ReactRoutes.usersListPath()}>
            <div className="nav-element right">Users</div>
          </a>
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
      <Route path={ReactRoutes.courseEditPath()} component={CourseEditPage} />
    </Route>
  </Router>
), document.getElementById('main-container'))
