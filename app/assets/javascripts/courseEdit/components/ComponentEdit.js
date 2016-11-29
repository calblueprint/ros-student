import React from 'react'
import _ from 'underscore'

import { Images } from '../../utils/image_helpers'

import DeleteModal from './DeleteModal'

class ComponentEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: this.props.component,
      openDeleteModal: false,
    }
    this.id = this.props.component.id
    this.deleteComponent = this.deleteComponent.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ component: nextProps.component })
  }

  renderComponentImage() {
    switch(this.state.component.component_type) {
      case 0:
        // slide
        return (
          <img className='course-image-icon margin' src={Images.empty_basic} />
        )
      case 1:
        // form
        return (
          <img className='course-image-icon margin' src={Images.open_quiz} />
        )
      case 2:
        // multimedia
        return (
          <img className='course-image-icon margin' src={Images.open_play} />
        )
    }
  }

  deleteComponent() {
    this.props.deleteComponent(this.id)
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
      <div>
        <div className='flex vertical course-edit-container'>
          {this.renderComponentImage()}
          <a target='blank' href={this.state.component.content_url}>{this.state.component.title}</a>
          <button
            className='button button--sm flex course-edit-delete'
            onClick={this.openModal}>
            <img
              className='course-image-icon'
              src={Images.delete} />
          </button>
          <DeleteModal
            openDeleteModal={this.state.openDeleteModal}
            closeModal={this.closeModal}
            deleteFunction={this.deleteComponent}
            objectType="component"
          />
        </div>
      </div>
    )
  }
}

export default ComponentEdit
