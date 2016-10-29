import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import { getInputToParams } from '../../utils/form_helpers'

import SectionEdit from './SectionEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'

class CourseEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.routeParams.id
    this.enableEdit = this.enableEdit.bind(this)
    this.state = {
      course: {
        name: '',
        description: '',
        sections: [],
      }
    }
    this.getCourse()
  }

  getCourse() {
    const path = APIRoutes.getEditCoursePath(this.id)
    request.get(path, (response) => {
      this.setState( { course: response.course_edit })
    }, (error) => {
      console.log('error')
    })
  }

  enableEdit() {
    this.setState({ editable: true })
  }

  updateCourse(params) {
    const path = APIRoutes.editCoursePath(this.id)
    request.update(path, params, (response) => {
      const course = this.state.course
      if (params.course.name) {
        course.name = params.course.name
      } else {
        course.description = params.course.description
      }
      this.setState({ course: course })
    }, (error) => {
      console.log(error)
    })    
  }

  onBlurName(value) {
    const params = { 
      course: {
        name: value,
      }
    }
    this.updateCourse(params)
  }

  onBlurDescription(value) {
    const params = { 
      course: {
        description: value,
      }
    }
    this.updateCourse(params)
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
        <h1>
          <InlineEditInput value={this.state.course.name} onBlur={this.onBlurName.bind(this)} />
          <InlineEditInput value={this.state.course.description} onBlur={this.onBlurDescription.bind(this)} />
        </h1>
        <ol>{this.renderSections()}</ol>
      </div>
    )
  }
}

export default CourseEditPage
