import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import { render } from 'react-dom'

import { ReactRoutes } from '../shared/routes'

import CourseEditPage from './components/CourseEditPage'

render((
  <Router history={browserHistory}>
    <Route path={ReactRoutes.courseEditPath()} component={CourseEditPage} />
  </Router>
), document.getElementById('main-container'))
