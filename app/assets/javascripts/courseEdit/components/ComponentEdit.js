import React from 'react'
import _ from 'underscore'

import { Images } from '../../utils/image_helpers'
import EditComponentForm from './EditComponentForm'

import DeleteModal from './DeleteModal'

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
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.showEditComponentForm = this.showEditComponentForm.bind(this)
    this.closeEditComponentForm = this.closeEditComponentForm.bind(this)
    this.onFormCompletion = this.onFormCompletion.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ component: nextProps.component })
  }

  renderComponentImage() {
    switch(this.state.component.component_type) {
      case 1:
        // slide
        return (
          <div className='inline-block'><img className='course-image-icon margin' src={Images.empty_basic} /></div>
        )
      case 2:
        // form
        return (
          <div className='inline-block'><img className='course-image-icon margin' src={Images.open_quiz} /></div>
        )
      default:
        // multimedia
        return (
          <div className='inline-block'><img className='course-image-icon margin' src={Images.open_play} /></div>
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

  showEditComponentForm() {
    this.setState({ openEditModal: true })
  }

  closeEditComponentForm() {
    this.setState({ openEditModal: false })
  }

  onFormCompletion(editedComponent) {
    this.setState({ component: editedComponent.component })
    this.closeEditComponentForm()
  }

  render() {
    return (
      <div>
        <div className='flex course-edit-container'>
          {this.renderComponentImage()}
          <a target='blank' href={this.state.component.content_url}>{this.state.component.title}</a>

          <div className='component-edit-buttons'>
            <button
              className='button button--sm flex'
              onClick={this.showEditComponentForm}>
              <img
                className='course-image-icon'
                src={Images.edit} />
            </button>

            <button
              className='button button--sm flex'
              onClick={this.openModal}>
              <img
                className='course-image-icon'
                src={Images.delete} />
            </button>
          </div>

          <EditComponentForm
            openComponentForm={this.state.openEditModal}
            closeModal={this.closeEditComponentForm}
            subsectionId={this.subsectionId}
            component={this.state.component}
            callback={this.onFormCompletion} />
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
