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
    request.get(this.props.coursePath, (response) => {
      this.setState({ courses: response.courses })
    }, (error) => {
      console.log('error')
    })
  }
}

CourseList.propTypes = {
  routeFunction: PropTypes.func.isRequired,
  coursePath: PropTypes.string.isRequired,
}

export default CourseList
