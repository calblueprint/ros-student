/**
 * Container page that holds AdminProfile. 
 */

import React from 'react'

import AdminProfile from './AdminProfile'

class AdminProfilePage extends React.Component {
  render() {
    return (
      <div className='container'>
        <div className='marginTop-xxl profile-container'>
          <AdminProfile id={this.props.routeParams.id} />
        </div>
      </div>
    )
  }
}

export default AdminProfilePage
