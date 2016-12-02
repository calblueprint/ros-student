import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { Images, convertImage } from '../../utils/image_helpers'

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
    this.onBlurName = this.onBlurName.bind(this)
    this.onBlurDescription = this.onBlurDescription.bind(this)
    this.onBlurImage = this.onBlurImage.bind(this)
    this.setImage = this.setImage.bind(this)
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
      course.imageUrl = response.course.image_url
      this.setState({ course: course })
    }, (error) => {
      console.log(error)
    })
  }

  setCourseValue(field, value) {
    const course = this.state.course
    course[field] = value
    this.setState({ course: course })
  }

  onBlurName(value) {
    const params = {
      course: {
        name: value,
      }
    }
    this.updateCourse(params)
    this.setCourseValue('name', value)
  }

  onBlurDescription(value) {
    const params = {
      course: {
        description: value,
      }
    }
    this.updateCourse(params)
    this.setCourseValue('description', value)
  }

  onBlurImage(value) {
    const params = {
      course: {
        photo_attributes: {
          image_data: value
        },
      },
    }
    this.updateCourse(params)
    this.setCourseValue('imageUrl', value)
  }

  setImage(e) {
    convertImage(e, this.onBlurImage)
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

  getImageStyle() {
    const imageUrl = this.state.course.imageUrl || Images.default_course

    return ({
      backgroundImage: `url(${imageUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    })
  }

  renderSections() {
    return this.state.course.sections.map((value) => {
      return (
        <div className='edit-section' key={value.id}>
          <SectionEdit section={value} deleteSection={this.deleteSection} />
        </div>
      )
    })
  }

  render() {
    return (
      <div className='flex center flex-vertical'>
        <div
          className='course-edit-header'
          style={this.getImageStyle()}
        >
          <div className='container course-edit-header-container'>
            <div className='course-edit-header-text'>
              <div className='course-edit-header-title'>
                <InlineEditInput
                  value={this.state.course.name}
                  onBlur={this.onBlurName}
                />
              </div>

              <div>
                <InlineEditInput
                  value={this.state.course.description}
                  onBlur={this.onBlurDescription}
                />
              </div>
            </div>

            <div className='course-edit-image-container'>
              <label
                htmlFor='course-edit-image-upload'
                className='button course-edit-image-upload'
                onChange={this.handleImage}>
                Change Cover
              </label>
              <input
                id='course-edit-image-upload'
                className='hidden-input'
                type='file'
                onChange={this.setImage}
                accept='image/jpg, image/jpeg, image/png'
              />
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='heading edit-module-text'>Edit Content</div>
          <div>{this.renderSections()}</div>
          <div className='white-box'>
            <button className='button button--white' onClick={this.createSection}>
              <div className='flex center'>
                <div className='inline-block'><img className='big-blue-plus' src={Images.big_blue_plus} /></div>
                <div className='inline-block'>Add new section</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseEditPage
