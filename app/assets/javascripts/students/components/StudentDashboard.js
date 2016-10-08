import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { ReactRoutes } from '../../shared/routes'


class StudentDashboard extends React.Component {

  render() {
    return (
      <div>
        <h1>Student Homepage</h1>
        <a href='/students/sign_out' data-method="delete">Sign Out</a>
        <Link
          to={ReactRoutes.updateStudentPath(getUser().id)}>
          Update User
        </Link>
      </div>
    )
  }
}

export default StudentDashboard
