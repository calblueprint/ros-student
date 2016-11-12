import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { ReactRoutes } from '../../shared/routes'

import CourseCard from '../../shared/components/courses/CourseCard'
import CourseList from '../../shared/components/courses/CourseList'

class StudentCourseList extends CourseList {
  sortCards() {
    return [this.state.courses.filter(function (course) { return course.is_enrolled}),
      this.state.courses.sort(function(x, y) {return (x.is_enrolled === y.is_enrolled)? 0 : x.is_enrolled? -1 : 1})]
  }

  render() {
    var lists = this.sortCards()
    var enrolledList = lists[0]
    var allList = lists[1]
    return (
      <div>
        <h1 className="enrolled-courses-title">Enrolled Courses</h1>
        <ol>{this.renderCards(enrolledList)}</ol>
        <h1 className="all-courses-title">All Courses</h1>
        <ol>{this.renderCards(allList)}</ol>
      </div>
    )
  }
}

export default StudentCourseList
