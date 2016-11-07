import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SectionEdit from './SectionEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'

class CourseEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.routeParams.id
    this.state = {
      course: {
        name: '',
        description: '',
        sections: [],
        imageUrl: '',
      }
    }
    this.getCourse()
    this.createSection = this.createSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
  }

  getCourse() {
    const path = APIRoutes.getEditCoursePath(this.id)
    request.get(path, (response) => {
      const course = this.state.course
      course.name = response.course_edit.name
      course.description = response.course_edit.description
      course.sections = response.course_edit.sections
      if (response.course_edit.photo) {
        course.imageUrl = response.course_edit.photo.image_url
      }
      this.setState({ course: course })
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
      course.name = response.course.name
      course.description = response.course.description
      if (response.course.photo) {
        course.imageUrl = response.course.photo.image_url
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

  onImage(value) {
    const params = {
      course: {
        photo_attributes: {
          image_data: value
        },
      },
    }
    this.updateCourse(params)
  }

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
        <img src={this.state.course.imageUrl} />
        <ImageUploadInput label='change cover photo' onChange={this.onImage.bind(this)} />
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
