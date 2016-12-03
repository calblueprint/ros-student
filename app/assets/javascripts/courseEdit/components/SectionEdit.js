import React from 'react'
import Collapse from 'react-collapse'
import _ from 'underscore'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SubsectionEdit from './SubsectionEdit'
import InlineEditInput from '../../shared/components/forms/InlineEditInput'
import { Images } from '../../utils/image_helpers'

import DeleteModal from './DeleteModal'

class SectionEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.section.id
    this.state = {
      loaded: false,
      section: this.props.section,
      isOpen: true,
      openDeleteModal: false,
    }

    this.createSubsection = this.createSubsection.bind(this)
    this.deleteSubsection = this.deleteSubsection.bind(this)
    this.deleteSection = this.deleteSection.bind(this)
    this.toggleSubsections = this.toggleSubsections.bind(this)
    this.onBlurTitle = this.onBlurTitle.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  // componentWillReceiveProps(nextProps) {
  //   if (!this.state.loaded) {
  //     this.setState({ section: nextProps.section, loaded: true })
  //   }
  // }

  createSubsection() {
    const path = APIRoutes.createSubsectionPath(this.id)

    request.post(path, {}, (response) => {
      const section = this.state.section
      section.subsections.push(response.subsection)
      this.setState({ section: section })
    }, (error) => {
      console.log(error)
    })
  }

  updateTitle(params) {
    const path = APIRoutes.editSectionPath(this.state.section.id)
    request.update(path, params, (response) => {
      const section = this.state.section
      section.title = response.section.title
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
    const isOpen = this.state.isOpen
    this.setState({ isOpen: !isOpen })
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
            <SubsectionEdit subsection={value} deleteSubsection={this.deleteSubsection} />
          </div>
        )
      })
    }
  }

  openModal(e) {
    e.preventDefault()
    this.setState({ openDeleteModal: true })
  }

  closeModal(e) {
    if (!_.isUndefined(e)) {
      e.preventDefault()
    }

    this.setState({ openDeleteModal: false })
  }

  render() {
    return (
      <div className='white-box'>
        <div className='flex vertical h2'>
          <img
            className='course-image-icon margin'
            src={Images.dropdown_arrow}
            onClick={this.toggleSubsections}
          />
          <InlineEditInput
            value={this.state.section.title}
            onBlur={this.onBlurTitle}
            buttonStyle='button button--sm button--white'
          />
          <button
            className='button button--sm button--white course-edit-delete'
            onClick={this.openModal}>
            <img
              className='course-image-icon'
              src={Images.delete} />
          </button>
        </div>

        <Collapse isOpened={this.state.isOpen}>
          <div>{this.renderSubsections()}</div>
          <button className='button button--white edit-subsection' onClick={this.createSubsection}>
            <div className='flex vertical'>
              <img className='course-image-icon margin' src={Images.empty_plus} />
              <div>Add new subsection</div>
            </div>
          </button>
        </Collapse>

        <DeleteModal
          openDeleteModal={this.state.openDeleteModal}
          closeModal={this.closeModal}
          deleteFunction={this.deleteSection}
          objectType="section"
        />
      </div>
    )
  }
}

export default SectionEdit
