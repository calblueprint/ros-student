import React from 'react'

import AdminProfile from './AdminProfile'
import AdminListTab from './AdminListTab'

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
        </div>
      </div>
    )
  }
}

export default AdminProfilePage
