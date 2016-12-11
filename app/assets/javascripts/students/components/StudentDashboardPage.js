import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { ReactRoutes, APIRoutes } from '../../shared/routes'

import StudentCourseList from './StudentCourseList'

class StudentDashboardPage extends React.Component {
  render() {
    var routeFunction = _.partial(ReactRoutes.courseOutlinePath);

    return (
      <div className="flex center">
        <div className="container">
          <StudentCourseList
            routeFunction={routeFunction}
            coursePath={APIRoutes.getStudentCoursesPath()}/>
        </div>
      </div>
    )
  }
}

export default StudentDashboardPage
