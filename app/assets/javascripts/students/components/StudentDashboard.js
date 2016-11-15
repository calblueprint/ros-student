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
      <div>
        <StudentCourseList routeFunction={routeFunction}/>
      </div>
    )
  }
}

export default StudentDashboard
