/**
 * Landing page of the admin platform, with a list of AdminCourseCard's that
 * link to the respective course edit pages for those courses.
 */
 
import _ from 'underscore'
import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/helpers/user_helpers'
import { ReactRoutes, RailsRoutes, APIRoutes } from '../../shared/routes'

import AdminCourseList from './AdminCourseList'

class AdminDashboardPage extends React.Component {

  render() {
    var routeFunction = _.partial(RailsRoutes.courseEditPath);

    return (
      <div className="flex center">
        <div className="container">
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
