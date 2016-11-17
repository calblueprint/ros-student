import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { ReactRoutes, RailsRoutes } from '../../shared/routes'

import AdminCourseCard from './AdminCourseCard'
import CourseList from '../../shared/components/courses/CourseList'

class AdminCourseList extends CourseList {
  renderCards(list) {
    return list.map((value) => {
      return (
        <AdminCourseCard key={value.id} course={value} route={this.props.routeFunction(value.id)}/>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="flex ghetto">
          <h1 className="enrolled-courses-title">Courses</h1>
          <a className="button " href={RailsRoutes.courseCreatePath()} data-method='post'>Create Course</a>
        </div>
        <ol>{this.renderCards(this.state.courses)}</ol>
      </div>
    )
  }
}

export default AdminCourseList
