import React, { PropTypes } from 'react'

import { APIRoutes } from '../../../shared/routes'
import request from '../../../shared/requests/request'

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
}

CourseList.propTypes = {
  routeFunction: PropTypes.func.isRequired,
}

export default CourseList
