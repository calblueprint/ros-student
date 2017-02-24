import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/helpers/user_helpers'
import { ReactRoutes, APIRoutes } from '../../shared/routes'

import Flash from '../../shared/components/forms/Flash'
import StudentCourseList from './StudentCourseList'

class StudentDashboardPage extends React.Component {
  render() {
    var routeFunction = _.partial(ReactRoutes.courseOutlinePath);

    return (
      <div className="flex center">
        <div className="container">

          <Flash />

          <StudentCourseList
            routeFunction={routeFunction}
            coursePath={APIRoutes.getStudentCoursesPath()}/>
        </div>
      </div>
    )
  }
}

export default StudentDashboardPage
