import React from 'react'

class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Admin Dashboard</h1>
        <a href='/admins/sign_out' data-method='delete'>Log out</a>
      </div>
    )
  }
}

export default AdminDashboard
