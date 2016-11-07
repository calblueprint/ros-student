import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'

import CourseList from './CourseList'

class StudentDashboard extends React.Component {
  render() {
    return (
      <div>
        <CourseList />
      </div>
    )
  }
}

export default StudentDashboard
