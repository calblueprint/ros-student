import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'

import StudentCourseList from './StudentCourseList'

class StudentDashboard extends React.Component {
  render() {
    var routeFunction = _.partial(ReactRoutes.courseOutlinePath);

    return (
      <div className="flex center">
        <div className="container">
          <StudentCourseList routeFunction={routeFunction}/>
        </div>
      </div>
    )
  }
}

export default StudentDashboard
