import React from 'react'
import { Link } from 'react-router'

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

  renderCards() {
    return this.state.courses.map((value) => {
      return (
        <Link
          to={ReactRoutes.courseOutlinePath(value.id)}>
          <CourseCard key={value.id} course={value} />
        </Link>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <ol>{this.renderCards()}</ol>
      </div>
    )
  }
}

export default CourseList
