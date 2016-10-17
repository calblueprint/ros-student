import React from 'react'

import CourseCard from '../CourseCard'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

class CourseListPage extends React.Component {
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
      console.log(response)
      // this.setState( { courses: response.})
    }, (error) => {
      console.log('error')
    })
  }

  renderCards() {

  }

  render() {
    return (
      <div>
        <h1>Courses</h1>

      </div>
    )
  }
}

export default CourseListPage
