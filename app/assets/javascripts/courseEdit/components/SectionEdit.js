import React from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'
import update from 'immutability-helper'
import { arrayMove } from 'react-sortable-hoc'

import { APIRoutes } from '../../shared/routes'
import { Images } from '../../utils/helpers/image_helpers'
import request from '../../shared/requests/request'

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

    this.onReorder = this.onReorder.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isUndefined(nextProps.forceOpen)) {
      this.setState({ isOpen: nextProps.forceOpen })
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

  createSubsection() {
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

  deleteSubsection(id) {
    const path = APIRoutes.editSubsectionPath(id)

    request.delete(path, (response) => {
      const section = this.state.section
      section.subsections = response.subsections
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  deleteSection() {
    this.props.deleteSection(this.props.section.id)
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

    const path = APIRoutes.switchSubsectionPath(subsection.id)
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
            buttonStyle='button button--sm-sq button--icon-transparent'
          />
          <button
            className='button button--sm marginLeft-sm'
            onClick={this.openReorderModal}>
            Reorder Subsections
          </button>

          <button
            className='button button--sm-sq button--icon-transparent course-edit-delete'
            onClick={this.openDeleteModal}>
            <i className='fa fa-trash fa-fw course-image-icon' aria-hidden='true'></i>
          </button>
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
        />

        <ReorderModal
          closeModal={this.closeReorderModal}
          isModalOpen={this.state.isReorderModalOpen}
          type='Subsections'
          items={this.state.section.subsections}
          onReorder={this.onReorder}
        />
      </div>
    )
  }
}

export default SectionEdit
