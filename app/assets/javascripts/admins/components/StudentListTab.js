import React from 'react'

import { APIRoutes } from '../../shared/routes'

import UserList from '../../shared/components/users/UserList'

class StudentListTab extends React.Component {
  render() {
    return (
      <div>
        <UserList route={APIRoutes.getStudentsPath()} />
      </div>
    )
  }
}

export default StudentListTab
