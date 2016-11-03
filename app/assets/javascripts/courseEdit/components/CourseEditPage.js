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
    this.createSection = this.createSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
  }

  getCourse() {
    const path = APIRoutes.getEditCoursePath(this.id)
    request.get(path, (response) => {
      console.log(response)
      this.setState({ course: response.course_edit })
    }, (error) => {
      console.log('error')
    })
  }

<<<<<<< b9992cac86487d98bf5d561e2a39217c9f34ea15
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
=======
  createSection() {
    const path = APIRoutes.createSectionPath(this.id)

    request.post(path, {}, (response) => {
      const course = this.state.course
      course.sections.push(response.section)
      this.setState({ course: course })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSection(id) {
    const path = APIRoutes.editSectionPath(id)

    request.delete(path, (response) => {
      const course = this.state.course
      course.sections = response.sections
      this.setState({ course: course })
    }, (error) => {
      console.log(error)
    })
>>>>>>> Added create/delete buttons for sections and subsections
  }

  renderSections() {
    return this.state.course.sections.map((value) => {
      return (
        <li key={value.id}>
          <SectionEdit section={value} deleteSection={this.deleteSection} />
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
        <button onClick={this.createSection}>Add section</button>
      </div>
    )
  }
}

export default CourseEditPage
