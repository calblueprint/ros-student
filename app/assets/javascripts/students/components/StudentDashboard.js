import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'

import CourseList from './CourseList'

class StudentDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Homepage</h1>
        <CourseList />
      </div>
    )
  }
}

export default StudentDashboard
