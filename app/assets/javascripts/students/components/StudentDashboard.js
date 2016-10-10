import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'

class StudentDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Student Homepage</h1>
        <Link
          to={ReactRoutes.updateStudentPath(getUser().id)}>
          Update User
        </Link>
        <a href={RailsRoutes.studentsSignOutPath()} data-method="delete">Sign Out</a>
      </div>
    )
  }
}

export default StudentDashboard
