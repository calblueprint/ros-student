import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { ReactRoutes } from '../../shared/routes'

import StudentCourseCard from './StudentCourseCard'
import CourseList from '../../shared/components/courses/CourseList'

class StudentCourseList extends CourseList {

  getCourses() {
    const path = APIRoutes.getPublishedCourses()

    request.get(path, (response) => {
      this.setState( { courses: response.courses })
    }, (error) => {
      console.log('error')
    })
  }

  renderCards(list) {
    return list.map((value) => {
      return (
        <StudentCourseCard key={value.id} course={value} route={this.props.routeFunction(value.id)}/>
      )
    })
  }

  sortCards() {
    return [this.state.courses.filter(function (course) { return course.is_enrolled}),
      this.state.courses.sort(function(x, y) {return (x.is_enrolled === y.is_enrolled)? 0 : x.is_enrolled? -1 : 1})]
  }

  render() {
    var lists = this.sortCards()
    let enrolledList = lists[0]
    var allList = lists[1]
    return (
      <div>
        <h1 className="courses-title courses-header">Enrolled Courses</h1>
        <ol className="course-list">{this.renderCards(enrolledList)}</ol>
        <h1 className="courses-title courses-header">All Courses</h1>
        <ol className="course-list">{this.renderCards(allList)}</ol>
      </div>
    )
  }
}

export default StudentCourseList
