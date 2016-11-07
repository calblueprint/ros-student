import React from 'react'
import { RouteHandler, Router, Route, Redirect, browserHistory } from 'react-router'
import { render } from 'react-dom'

import '../../stylesheets/bundle/students.scss'

import { ReactRoutes } from '../shared/routes'

import UpdateStudentPage from './components/UpdateStudentPage'
import StudentDashboard from './components/StudentDashboard'
import CourseOutlinePage from './components/CourseOutlinePage'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.updateStudentPath()} component={UpdateStudentPage} />
    <Route path={ReactRoutes.dashboardPath()} component={StudentDashboard} />
    <Route path={ReactRoutes.courseOutlinePath()} component={CourseOutlinePage} />
    <Redirect from={ReactRoutes.rootPath()} to={ReactRoutes.dashboardPath()} />
  </Router>
), document.getElementById('main-container'))
