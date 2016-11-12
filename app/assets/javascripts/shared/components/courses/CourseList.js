import React, { PropTypes } from 'react'

import { APIRoutes } from '../../../shared/routes'
import request from '../../../shared/requests/request'

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
        <CourseCard key={value.id} course={value} route={this.props.route}/>
      )
    })
  }
}

CourseList.propTypes = {
  route: PropTypes.string.isRequired,
}

export default CourseList
