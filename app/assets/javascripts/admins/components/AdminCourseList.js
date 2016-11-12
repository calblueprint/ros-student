import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { ReactRoutes } from '../../shared/routes'

import CourseCard from '../../shared/components/courses/CourseCard'
import CourseList from '../../shared/components/courses/CourseList'

class AdminCourseList extends CourseList {
  render() {
    return (
      <div>
        <h1>Courses</h1>
        <ol>{this.renderCards(this.state.courses)}</ol>
      </div>
    )
  }
}

export default AdminCourseList
