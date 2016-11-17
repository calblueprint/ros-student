import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { ReactRoutes, RailsRoutes } from '../../shared/routes'

import AdminCourseList from './AdminCourseList'

class AdminDashboardPage extends React.Component {
  render() {
    var routeFunction = _.partial(RailsRoutes.courseEditPath);

    return (
      <div className="container flex center">
        <AdminCourseList routeFunction={routeFunction}/>
      </div>
    )
  }
}

export default AdminDashboardPage
