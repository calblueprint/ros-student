import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SectionEdit from './SectionEdit'

class CourseEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.routeParams.id
    this.state = {
      course: {
        name: '',
        description: '',
        sections: [],
      },
    }
    this.getCourse()
  }

  getCourse() {
    const path = APIRoutes.getEditCoursePath(this.id)
    request.get(path, (response) => {
      console.log(response)
      this.setState( { course: response.course_edit })
    }, (error) => {
      console.log('error')
    })
  }

  renderSections() {
    return this.state.course.sections.map((value) => {
      return (
        <li key={value.id}>
          <SectionEdit section={value} />
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Course Edit: {this.state.course.name}</h1>
        <ol>{this.renderSections()}</ol>
      </div>
    )
  }
}

export default CourseEditPage
