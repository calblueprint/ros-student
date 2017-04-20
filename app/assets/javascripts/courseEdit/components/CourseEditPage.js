import _ from 'underscore'
import React from 'react'
import update from 'immutability-helper'
import { arrayMove } from 'react-sortable-hoc'

import { APIRoutes, RailsRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'
import { Images, convertImage } from '../../utils/helpers/image_helpers'
import { snakeToCamel } from '../../utils/helpers/form_helpers'

import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import SimpleModal from '../../shared/components/widgets/SimpleModal'

import SectionEdit from './SectionEdit'
import DeleteCourseModal from './DeleteCourseModal'
import PublishCourseModal from './PublishCourseModal'
import ReorderModal from './ReorderModal'

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
      forceOpen: false,
      isDeleteModalOpen: false,
      isReorderModalOpen: false,
      isDisabledModalOpen: false,
      isPublishModalOpen: false,
    }

    this.createSection = this.createSection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.onBlurName = this.onBlurName.bind(this)
    this.onBlurDescription = this.onBlurDescription.bind(this)
    this.onBlurImage = this.onBlurImage.bind(this)
    this.setImage = this.setImage.bind(this)
    this.hasEmpty = this.hasEmpty.bind(this)

    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.openReorderModal = this.openReorderModal.bind(this)
    this.closeReorderModal = this.closeReorderModal.bind(this)
    this.openDisabledModal = this.openDisabledModal.bind(this)
    this.closeDisabledModal = this.closeDisabledModal.bind(this)
    this.openPublishModal = this.openPublishModal.bind(this)
    this.closePublishModal = this.closePublishModal.bind(this)

    this.onConfirmDelete = this.onConfirmDelete.bind(this)
    this.toggleIsPublished = this.toggleIsPublished.bind(this)
    this.toggleIsCollapsed = this.toggleIsCollapsed.bind(this)
    this.onReorder = this.onReorder.bind(this)
    this.updateMoveComponent = this.updateMoveComponent.bind(this)
    this.updateMoveSubsection = this.updateMoveSubsection.bind(this)
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

  openReorderModal() {
    this.setState({ isReorderModalOpen: true })
  }

  closeReorderModal() {
    this.setState({ isReorderModalOpen: false })
  }

  openDisabledModal() {
    this.setState({ isDisabledModalOpen: true })
  }

  closeDisabledModal() {
    this.setState({ isDisabledModalOpen: false })
  }

  openPublishModal() {
    this.setState({ isPublishModalOpen: true })
  }

  closePublishModal() {
    this.setState({ isPublishModalOpen: false })
  }

  getCourse() {
    const path = APIRoutes.getEditCoursePath(this.id)
    request.get(path, (response) => {
      this.setState({ course: snakeToCamel(response) })
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
    this.closePublishModal()
  }

  toggleIsCollapsed() {
    this.setState({ forceOpen: !this.state.forceOpen })
  }

  setImage(e) {
    convertImage(e, this.onBlurImage)
  }

  createSection() {
    if (this.state.course.isPublished) {
      this.openDisabledModal()
      return
    }

    const path = APIRoutes.createSectionPath(this.id)

    request.post(path, {}, (response) => {
      const course = this.state.course
      course.sections.push(response)
      this.setState({ course: course })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSection(id, index) {
    const path = APIRoutes.editSectionPath(id)

    request.delete(path, (response) => {
      const course = this.state.course
      course.sections.splice(index, 1)
      course.sections.map((value, index) => {
        value.position = index + 1
      })
      this.setState({ course: course })
    }, (error) => {
      console.log(error)
    })
  }

  onReorder({ oldIndex, newIndex }) {
    const section = this.state.course.sections[oldIndex]
    if (oldIndex == newIndex || !section) {
      return
    }

    const path = APIRoutes.reorderSectionPath(section.id)
    const params = {
      section: {
        position: newIndex + 1,
      }
    }

    const sections = this.state.course.sections
    this.setState({ course: update(this.state.course, {
      sections: { $set: arrayMove(sections, oldIndex, newIndex) },
    })})

    request.post(path, params, (response) => {
    }, (error) => {
      console.log(error)
      this.setState({ course: update(this.state.course, {
        sections: { $set: arrayMove(sections, newIndex, oldIndex) },
      })})
    })
  }

  updateMoveComponent(
    component,
    prevComponentIndex,
    prevSectionIndex,
    prevSubsectionIndex,
    sectionIndex,
    subsectionIndex
  ) {
    if (prevSectionIndex == sectionIndex && prevSubsectionIndex == subsectionIndex) {
      return
    }

    const course = this.state.course

    const prevComponentList = course.sections[prevSectionIndex].subsections[prevSubsectionIndex].components
    prevComponentList.splice(prevComponentIndex, 1)
    prevComponentList.map((value, index) => {
      value.position = index + 1
    })
    course.sections[prevSectionIndex].subsections[prevSubsectionIndex].components = prevComponentList

    const newComponentList = course.sections[sectionIndex].subsections[subsectionIndex].components
    newComponentList.push(component)
    course.sections[sectionIndex].subsections[subsectionIndex].components = newComponentList

    this.setState({ course: course })
  }

  updateMoveSubsection(
    subsection,
    prevSectionIndex,
    prevSubsectionIndex,
    sectionIndex,
  ) {
    if (prevSectionIndex == sectionIndex) {
      return
    }

    const course = this.state.course

    const prevSubsectionList = course.sections[prevSectionIndex].subsections
    prevSubsectionList.splice(prevSubsectionIndex, 1)
    prevSubsectionList.map((value, index) => {
      value.position = index + 1
    })
    course.sections[prevSectionIndex].subsections = prevSubsectionList

    const newSubsectionList = course.sections[sectionIndex].subsections
    newSubsectionList.push(subsection)
    course.sections[sectionIndex].subsections = newSubsectionList

    this.setState({ course: course })
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

  hasEmpty() {
    const sections = this.state.course.sections
    if (sections.length == 0) {
      return true
    }

    // For all sections, returns true if it has no subsections
    // Else, check if any of its subsections has no components
    const boolSections = _.map(sections, (section) => {
      if (section.subsections.length == 0) {
        return true
      } else {
        return _.some(section.subsections, (subsection) => {
          return subsection.components.length == 0
        })
      }
    })

    // Check if any sections return true
    return _.contains(boolSections, true)
  }

  renderPublishLabel() {
    return this.state.course.isPublished ? 'Unpublish Course' : 'Publish Course'
  }

  renderCollapsedLabel() {
    return this.state.forceOpen ? (
      <span>
        Collapse Lessons
        <i className='fa fa-compress marginLeft-sm' aria-hidden='true'></i>
      </span>
    ) : (
      <span>
        Expand Lessons
        <i className='fa fa-expand marginLeft-sm' aria-hidden='true'></i>
      </span>
    )
  }

  renderSections() {
    return this.state.course.sections.map((value) => {
      return (
        <div className='component-edit-section' key={value.id}>
          <SectionEdit
            section={value}
            deleteSection={this.deleteSection}
            forceOpen={this.state.forceOpen}
            course={this.state.course}
            updateMoveComponent={this.updateMoveComponent}
            updateMoveSubsection={this.updateMoveSubsection}
          />
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
                    buttonStyle="button button--sm-sq button--ghost"
                  />
                </div>

                <div>
                  <InlineEditInput
                    value={this.state.course.description}
                    onBlur={this.onBlurDescription}
                    buttonStyle="button button--sm-sq button--ghost"
                    rows={3}
                  />
                </div>
              </div>

              <div className='course-edit-image-container'>
                <label
                  htmlFor='course-edit-image-upload'
                  className='button course-edit-image-upload'
                  onChange={this.handleImage}
                >
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
              onClick = {this.toggleIsCollapsed}
            >
              {this.renderCollapsedLabel()}
            </button>
            <button
              onClick={this.openReorderModal}
              className='button marginLeft-sm'>
              Reorder Sections
              <i className='fa fa-random marginLeft-sm' aria-hidden='true'></i>
            </button>
          </div>

          <div>{this.renderSections()}</div>
          <div className='white-box'>
            <button
              className='button button--white'
              onClick={this.createSection}
            >
              <div className='flex vertical'>
                <img className='big-blue-plus' src={Images.big_blue_plus} />
                <div>Add new section</div>
              </div>
            </button>
          </div>


          <div className='course-edit-controls'>
            <h2 className='course-edit-controls-title'>
              <i className='fa fa-exclamation-triangle marginRight-sm' aria-hidden='true'></i>
              COURSE CONTROLS
              <i className='fa fa-exclamation-triangle marginLeft-sm' aria-hidden='true'></i>
            </h2>
            <p className='course-edit-controls-warning'>
              Please take caution before using the features below. Drastic changes may significantly affect students' current progress in the course.
            </p>
            <div className='course-edit-controls-container'>
              <button
                className='button marginRight-md'
                onClick={this.openPublishModal}
              >
                {this.renderPublishLabel()}
              </button>

              <button
                onClick={this.openDeleteModal}
                className='button course-edit-delete marginLeft-sm'
              >
                <i className='fa fa-trash fa-fw course-image-icon white' aria-hidden='true'></i>
              </button>
            </div>
          </div>
        </div>

        <DeleteCourseModal
          closeModal={this.closeDeleteModal}
          openModal={this.state.isDeleteModalOpen}
          onDelete={this.onConfirmDelete}
          name={this.state.course.name}
        />

        <ReorderModal
          closeModal={this.closeReorderModal}
          isModalOpen={this.state.isReorderModalOpen}
          type='Sections'
          items={this.state.course.sections}
          onReorder={this.onReorder}
          disabled={this.state.course.isPublished}
        />

        <SimpleModal
          isModalOpen={this.state.isDisabledModalOpen}
          closeModal={this.closeDisabledModal}
          title='Add Section'
        >
          <div>
            This course has already been published - adding sections is now disabled so that those already taking the course won't be affected. If you'd like to make changes, unpublish the course first.
          </div>
        </SimpleModal>

        <PublishCourseModal
          closeModal={this.closePublishModal}
          isModalOpen={this.state.isPublishModalOpen}
          onTogglePublish={this.toggleIsPublished}
          isPublished={this.state.course.isPublished}
          hasEmpty={this.hasEmpty}
        />
      </div>
    )
  }
}

export default CourseEditPage
