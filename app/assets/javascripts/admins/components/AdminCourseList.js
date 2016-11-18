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
        <div className="courses-header flex">
          <h1 className="courses-title">Courses</h1>
          <a className="button " href={RailsRoutes.courseCreatePath()} data-method='post'>Create Course</a>
        </div>
        <ol className="course-list">{this.renderCards(this.state.courses)}</ol>
      </div>
    )
  }
}

export default AdminCourseList
