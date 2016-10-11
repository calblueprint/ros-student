import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { ReactRoutes, RailsRoutes } from '../../shared/routes'

class AdminDashboardPage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Admin Dashboard</h1>
        <Link to={ReactRoutes.updateAdminPath(getUser().id)}>Update Admin</Link>
        <a href={RailsRoutes.adminsSignOutPath()} data-method='delete'>Log out</a>
      </div>
    )
  }
}

export default AdminDashboardPage
