import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { ReactRoutes, RailsRoutes } from '../../shared/routes'

import CourseList from './AdminCourseList'

class AdminDashboardPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Admin Dashboard</h1>
        <a href={RailsRoutes.courseCreatePath()} data-method='post'>Create Course</a>
        <AdminCourseList route={ReactRoutes.getEditCoursePath(value.id)}/>
      </div>
    )
  }
}

export default AdminDashboardPage
