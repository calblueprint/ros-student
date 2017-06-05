/**
 * A tab component located on UsersListPage which inherits from the base class
 * UserList and renders a list of all the students on the platform.
 */

import React from 'react'

import { APIRoutes } from '../../shared/routes'

import UserList from '../../shared/components/users/UserList'

class StudentListTab extends React.Component {
  render() {
    return (
      <div className='user-tab-container'>
        <UserList
          editRoute={APIRoutes.getStudentsPath}
          deleteRoute={APIRoutes.deleteStudentPath}
        />
      </div>
    )
  }
}

export default StudentListTab
