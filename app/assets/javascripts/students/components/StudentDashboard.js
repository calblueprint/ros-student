import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'

import StudentCourseList from './StudentCourseList'

class StudentDashboard extends React.Component {
  render() {
    return (
      <div>
        <StudentCourseList route={ReactRoutes.courseOutlinePath(value.id)}/>
      </div>
    )
  }
}

export default StudentDashboard
