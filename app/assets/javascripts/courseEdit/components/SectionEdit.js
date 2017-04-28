import React, { PropTypes } from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'
import update from 'immutability-helper'
import { arrayMove } from 'react-sortable-hoc'

import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'
import request from '../../shared/requests/request'
import SimpleModal from '../../shared/components/widgets/SimpleModal'

import SubsectionEdit from './SubsectionEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import DeleteModal from '../../shared/components/widgets/DeleteModal'
import ReorderModal from './ReorderModal'

class SectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.section.id
    this.state = {
      loaded: false,
      section: this.props.section,
      isOpen: false,
      openDeleteModal: false,
      isReorderModalOpen: false,
      isDisabledModalOpen: false,
    }

    this.createSubsection = this.createSubsection.bind(this)
    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.toggleSubsections = this.toggleSubsections.bind(this)
    this.onBlurTitle = this.onBlurTitle.bind(this)

    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.openReorderModal = this.openReorderModal.bind(this)
    this.closeReorderModal = this.closeReorderModal.bind(this)
    this.openDisabledModal = this.openDisabledModal.bind(this)
    this.closeDisabledModal = this.closeDisabledModal.bind(this)

    this.onReorder = this.onReorder.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isUndefined(nextProps.forceOpen) && this.props.forceOpen != nextProps.forceOpen) {
      this.setState({
        isOpen: nextProps.forceOpen,
        section: nextProps.section,
      })
    } else {
      this.setState({ section: nextProps.section })
    }
  }

  openDeleteModal(e) {
    e.preventDefault()
    this.setState({ openDeleteModal: true })
  }

  closeDeleteModal(e) {
    if (!_.isUndefined(e)) {
      e.preventDefault()
    }

    this.setState({ openDeleteModal: false })
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

  createSubsection() {
    if (this.props.course.isPublished) {
      this.openDisabledModal()
      return
    }

    const path = APIRoutes.createSubsectionPath(this.id)

    request.post(path, {}, (response) => {
      const section = this.state.section
      section.subsections.push(response)
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  updateTitle(params) {
    const path = APIRoutes.editSectionPath(this.state.section.id)
    request.update(path, params, (response) => {
      const section = this.state.section
      section.title = response.title
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSubsection(id, index) {
    const path = APIRoutes.editSubsectionPath(id)

    request.delete(path, (response) => {
      const section = this.state.section
      section.subsections.splice(index, 1)
      section.subsections.map((value, index) => {
        value.position = index + 1
      })
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSection() {
    this.props.deleteSection(this.state.section.id, this.state.section.position - 1)
  }

  onBlurTitle(value) {
    const params = {
      section: {
        title: value,
      }
    }
    this.updateTitle(params)
  }

  toggleSubsections() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onReorder({ oldIndex, newIndex }) {
    const subsection = this.state.section.subsections[oldIndex]
    if (oldIndex == newIndex || !subsection) {
      return
    }

    const path = APIRoutes.reorderSubsectionPath(subsection.id)
    const params = {
      subsection: {
        position: newIndex + 1,
      }
    }

    const subsections = this.state.section.subsections
    this.setState({ section: update(this.state.section, {
      subsections: { $set: arrayMove(subsections, oldIndex, newIndex) },
    })})

    request.post(path, params, (response) => {
      this.setState({ subsections: response })
    }, (error) => {
      console.log(error)
      this.setState({ section: update(this.state.section, {
        subsections: { $set: arrayMove(subsections, newIndex, oldIndex) },
      })})
    })
  }

  renderSubsections() {
    if (!this.state.section.subsections) {
      return (
        <div>No subsections to show!</div>
      )
    } else {
      return this.state.section.subsections.map((value) => {
        return (
          <div className='course-edit-subsection' key={value.id}>
            <SubsectionEdit
              subsection={value}
              deleteSubsection={this.deleteSubsection}
              course={this.props.course}
              updateMoveComponent={this.props.updateMoveComponent}
              updateMoveSubsection={this.props.updateMoveSubsection}
              section={this.state.section}
            />
          </div>
        )
      })
    }
  }

  render() {
    const arrow = this.state.isOpen ? 'rotate' : ''
    return (
      <div className='white-box'>
        <div className='flex vertical h2'>
          <img
            className={`course-image-icon margin collapse ${arrow}`}
            src={Images.dropdown_arrow}
            onClick={this.toggleSubsections}
          />
          <InlineEditInput
            value={this.state.section.title}
            onBlur={this.onBlurTitle}
            buttonStyle='button button--sm-sq button--white'
          />
          <div className='course-edit-button-container'>
            <button
              className='button button--sm button--white marginRight-sm tooltip'
              onClick={this.openReorderModal}
            >
              <i className='fa fa-random course-image-icon' aria-hidden='true'></i>
              <span
                className='tooltiptext top'>
                Reorder subsections
              </span>
            </button>

            <button
              className='button button--sm button--white course-edit-delete tooltip'
              onClick={this.openDeleteModal}>
              <i className='fa fa-trash fa-fw course-image-icon' aria-hidden='true'></i>
              <span
                className='tooltiptext top'>
                Delete section
              </span>
            </button>
          </div>
        </div>

        <Collapse isOpened={this.state.isOpen && !this.props.isSorting}>
          <div>{this.renderSubsections()}</div>
          <button
            className='button button--white add-subsection-button'
            onClick={this.createSubsection}
          >
            <div className='flex vertical'>
              <img className='course-image-icon margin' src={Images.empty_plus} />
              <div>Add new subsection</div>
            </div>
          </button>
        </Collapse>

        <DeleteModal
          openDeleteModal={this.state.openDeleteModal}
          closeModal={this.closeDeleteModal}
          deleteFunction={this.deleteSection}
          objectType='section'
          disabled={this.props.course.isPublished}
        />

        <ReorderModal
          type='Subsections'
          closeModal={this.closeReorderModal}
          isModalOpen={this.state.isReorderModalOpen}
          items={this.state.section.subsections}
          onReorder={this.onReorder}
          disabled={this.props.course.isPublished}
        />

        <SimpleModal
          isModalOpen={this.state.isDisabledModalOpen}
          closeModal={this.closeDisabledModal}
          title='Add Subsection'
        >
          <div>
            This course has already been published - adding subsections is now disabled so that those already taking the course won't be affected. If you'd like to make changes, unpublish the course first.
          </div>
        </SimpleModal>
      </div>
    )
  }
}

SectionEdit.propTypes = {
  section: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  isSorting: PropTypes.bool,
  updateMoveComponent: PropTypes.func.isRequired,
  updateMoveSubsection: PropTypes.func.isRequired,
}

export default SectionEdit
