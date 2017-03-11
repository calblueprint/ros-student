import React from 'react'
import _ from 'underscore'

import { Images } from '../../utils/image_helpers'
import EditComponentForm from './EditComponentForm'

import DeleteModal from '../../shared/components/widgets/DeleteModal'

class ComponentEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      component: this.props.component,
      openDeleteModal: false,
      openEditModal: false,
    }

    this.id = this.props.component.id
    this.subsectionId = this.props.component.subsectionId

    this.deleteComponent = this.deleteComponent.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
    this.onFormCompletion = this.onFormCompletion.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ component: nextProps.component })
  }

  deleteComponent() {
    this.props.deleteComponent(this.id)
  }

  openDeleteModal(e) {
    if (!_.isUndefined(e)) {
      e.stopPropagation()
      e.preventDefault()
    }

    this.setState({ openDeleteModal: true })
  }

  closeDeleteModal() {
    this.setState({ openDeleteModal: false })
  }

  openEditModal() {
    this.setState({ openEditModal: true })
  }

  closeEditModal() {
    this.setState({ openEditModal: false })
  }

  onFormCompletion(editedComponent) {
    this.setState({ component: editedComponent })
    this.closeEditModal()
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

  render() {
    return (
      <div className='fill'>
        <div className='course-edit-component-container'>
          <div
            className='flex vertical course-edit-component'
            onClick={this.openEditModal}
          >
            {this.renderComponentImage()}
            <p>{this.state.component.title}</p>

            <button
              className='button button--sm button--white course-edit-delete'
              onClick={this.openDeleteModal}>
              <i className='fa fa-trash fa-fw course-image-icon' aria-hidden='true'></i>
            </button>
          </div>
        </div>

        <EditComponentForm
          openComponentForm={this.state.openEditModal}
          closeModal={this.closeEditModal}
          subsectionId={this.subsectionId}
          component={this.state.component}
          callback={this.onFormCompletion}
        />

        <DeleteModal
          openDeleteModal={this.state.openDeleteModal}
          closeModal={this.closeDeleteModal}
          deleteFunction={this.deleteComponent}
          objectType='component'
        />
      </div>
    )
  }
}

export default ComponentEdit
