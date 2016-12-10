import React from 'react'

import AdminProfile from './AdminProfile'
import AdminListTab from './AdminListTab'
import StudentListTab from './StudentListTab'

class AdminProfilePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='flex'>
          <div className='marginTop-sm profile-container'>
            <AdminProfile id={this.props.routeParams.id} />
          </div>
          <div className='marginTop-sm admin-list-container'>
            <AdminListTab />
          </div>
          <StudentListTab />
        </div>
      </div>
    )
  }
}

export default AdminProfilePage
