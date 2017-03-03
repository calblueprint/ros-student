import _ from 'underscore'
import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { ReactRoutes, RailsRoutes } from '../../shared/routes'

import AdminCourseCard from './AdminCourseCard'
import CourseList from '../../shared/components/courses/CourseList'

class AdminCourseList extends CourseList {

  getPublishedCourses() {
    return _.filter(this.state.courses, (course) => {
      return course.is_published === true
    })
  }

  getDraftCourses() {
    return _.filter(this.state.courses, (course) => {
      return course.is_published === false
    })
  }

  renderCards(list) {
    return list.map((value) => {
      return (
        <AdminCourseCard
          key={value.id}
          course={value}
          route={this.props.routeFunction(value.id)}
        />
      )
    })
  }

  render() {
    return (
      <div>
        <div className='courses-header flex'>
          <h1 className='courses-title'>Courses</h1>
          <a className='button' href={RailsRoutes.courseCreatePath()} data-method='post'>Create Course</a>
        </div>
        <h2 className='courses-subtitle'>Published</h2>
        <ol className="course-list">
          {this.renderCards(this.getPublishedCourses())}
        </ol>
        <h2 className='courses-subtitle'>Drafts</h2>
        <ol className="course-list">
          {this.renderCards(this.getDraftCourses())}
        </ol>
      </div>
    )
  }
}

export default AdminCourseList
