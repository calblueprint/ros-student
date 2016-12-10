import React from 'react'

import { APIRoutes } from '../../shared/routes'

import UserList from '../../shared/components/users/UserList'

class StudentListTab extends React.Component {
  render() {
    return (
      <div>
        <UserList
          editRoute={APIRoutes.getStudentsPath}
          deleteRoute={APIRoutes.deleteStudentPath}
        />
      </div>
    )
  }
}

export default StudentListTab
