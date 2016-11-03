import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { ReactRoutes } from '../../shared/routes'

import CourseCard from './CourseCard'

class CourseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      courses: [],
    }

    this.getCourses()
  }

  getCourses() {
    const path = APIRoutes.getCourses()

    request.get(path, (response) => {
      this.setState( { courses: response.courses })
    }, (error) => {
      console.log('error')
    })
  }

  renderCards(list) {
    return list.map((value) => {
      return (
        <CourseCard key={value.id} course={value} />
      )
    })
  }

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
        <h1>Enrolled Courses</h1>
        <ol>{this.renderCards(enrolledList)}</ol>
        <h1>All Courses</h1>
        <ol>{this.renderCards(allList)}</ol>
      </div>
    )
  }
}

export default CourseList
