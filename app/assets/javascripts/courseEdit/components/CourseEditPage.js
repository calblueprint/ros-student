import React from 'react'

import { APIRoutes, RailsRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { Images, convertImage } from '../../utils/image_helpers'
import { snakeToCamel } from '../../utils/form_helpers'

import InlineEditInput from '../../shared/components/forms/InlineEditInput'

import SectionEdit from './SectionEdit'
import DeleteCourseModal from './DeleteCourseModal'

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
        isPublished: false,
      },
      isDeleteModalOpen: false,
      forceOpen: false,
    }

    this.createSection = this.createSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.onBlurName = this.onBlurName.bind(this)
    this.onBlurDescription = this.onBlurDescription.bind(this)
    this.onBlurImage = this.onBlurImage.bind(this)
    this.setImage = this.setImage.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.onConfirmDelete = this.onConfirmDelete.bind(this)
    this.toggleIsPublished = this.toggleIsPublished.bind(this)
    this.toggleIsCollapsed = this.toggleIsCollapsed.bind(this)
  }

  componentDidMount() {
    this.getCourse()
  }

  openDeleteModal() {
    this.setState({ isDeleteModalOpen: true })
  }

  closeDeleteModal() {
    this.setState({ isDeleteModalOpen: false })
  }

  getCourse() {
    const path = APIRoutes.getEditCoursePath(this.id)
    request.get(path, (response) => {
      this.setState({ course: snakeToCamel(response) })
      const course = this.state.course
      console.log(course)
      for (const section in course.sections) {
        course.sections[section]['isOpen'] = false
      }
      console.log(course)
      this.setState({course: course})
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
      course.name = response.name
      course.description = response.description
      course.imageUrl = response.image_url
      course.isPublished = response.is_published
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

  onConfirmDelete() {
    const path = APIRoutes.deleteCoursePath(this.state.course.id)
    request.delete(path, (response) => {
      window.location = RailsRoutes.dashboardPath()
    }, (error) => {
      console.log(error)
    })
  }

  toggleIsPublished() {
    const params = {
      course: {
        is_published: !this.state.course.isPublished
      },
    }
    this.updateCourse(params)
    this.setCourseValue('isPublished', !this.state.course.isPublished)
  }

  toggleIsCollapsed() {
    this.setState({ forceOpen: !this.state.forceOpen})
  }

  setImage(e) {
    convertImage(e, this.onBlurImage)
  }

  createSection() {
    const path = APIRoutes.createSectionPath(this.id)

    request.post(path, {}, (response) => {
      const course = this.state.course
      course.sections.push(response)
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
      backgroundSize: 'cover',
    })
  }

  renderPublishLabel() {
    return this.state.course.isPublished ? 'Unpublish course' : 'Publish course'
  }

  renderCollapsedLabel() {
    return this.state.forceOpen ? 'Collapse Courses' : 'Expand Courses'
  }

  renderSections() {
    return this.state.course.sections.map((value) => {
      return (
        <div className='component-edit-section' key={value.id}>
          <SectionEdit section={value} deleteSection={this.deleteSection} forceOpen={this.state.forceOpen}/>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='flex center flex-vertical'>
        <div
          className='flex center course-edit-header'
          style={this.getImageStyle()}
        >
          <div className='linear-gradient-60-mask flex center course-edit-header'>
            <div className='container course-edit-header-container'>
              <div className='course-edit-header-text'>
                <div className='course-edit-header-title'>
                  <InlineEditInput
                    value={this.state.course.name}
                    onBlur={this.onBlurName}
                    buttonStyle='button button--sm-sq button--white'
                  />
                </div>

                <div>
                  <InlineEditInput
                    value={this.state.course.description}
                    onBlur={this.onBlurDescription}
                    buttonStyle='button button--sm-sq button--white'
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
        </div>

        <div className='container'>
          <div className='flex vertical edit-module-container'>
            <h1 className='h1'>
              Edit Content
            </h1>

            <button
              className='button marginLeft-sm'
              onClick={this.toggleIsPublished}
            >
              {this.renderPublishLabel()}
            </button>
            <button
            className='button marginLeft-sm'
              onClick = {this.toggleIsCollapsed}
            >
              {this.renderCollapsedLabel()}
            </button>
            <button
              onClick={this.openDeleteModal}
              className='button course-edit-delete'>
              <i className='fa fa-trash fa-fw course-image-icon white' aria-hidden='true'></i>
            </button>
          </div>

          <div>{this.renderSections()}</div>
          <div className='white-box'>
            <button className='button button--white' onClick={this.createSection}>
              <div className='flex vertical'>
                <img className='big-blue-plus' src={Images.big_blue_plus} />
                <div>Add new section</div>
              </div>
            </button>
          </div>
        </div>

        <DeleteCourseModal
          closeModal={this.closeDeleteModal}
          openDeleteModal={this.state.isDeleteModalOpen}
          onDelete={this.onConfirmDelete}
          name={this.state.course.name}
        />
      </div>
    )
  }
}

export default CourseEditPage
