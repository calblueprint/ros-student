import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'

import { getFlashes } from '../../utils/form_helpers'
import { getUser } from '../../utils/user_helpers'
import { ReactRoutes, RailsRoutes, APIRoutes } from '../../shared/routes'

import Flash from '../../shared/components/forms/Flash'
import AdminCourseList from './AdminCourseList'

class AdminDashboardPage extends React.Component {

  render() {
    var routeFunction = _.partial(RailsRoutes.courseEditPath);

    return (
      <div className="flex center">
        <div className="container">
          <Flash />
          <AdminCourseList
            routeFunction={routeFunction}
            coursePath={APIRoutes.getAdminCoursesPath()}
          />
        </div>
      </div>
    )
  }
}

export default AdminDashboardPage
