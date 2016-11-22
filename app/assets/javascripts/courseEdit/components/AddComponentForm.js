import React from 'react'
import Modal from 'react-bootstrap-modal'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import SlideForm from './SlideForm'
import QuizForm from './QuizForm'
import MultimediaForm from './MultimediaForm'
import { getInputToParams } from '../../utils/form_helpers'
import { Images } from '../../utils/image_helpers'

class AddComponentForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formType: 0,
      subsectionId: this.props.subsectionId,
      isModalOpen: false,
      activeForm: null,
    }
  }

  createComponent(componentJson) {
    const path = APIRoutes.createComponentPath(this.props.subsectionId)

    const form = {
      componentType: { value: componentJson.componentType },
      title: { value: componentJson.title },
      audioUrl: { value: componentJson.audioUrl },
      contentUrl: { value: componentJson.contentUrl },
      subsectionId: { value: this.props.subsectionId },
      audioData: { value: componentJson.audioData },
      imageData: { value: componentJson.imageData }
    }
    const componentParams = { component: getInputToParams(form) }

    if (componentParams.component.image_data != null) {
      componentParams.component.photo_attributes = { image_data: componentParams.component.image_data }
    }

    request.post(path, componentParams, (response) => {
      this.props.callback(response)
    }, (error) => {
      console.log(error)
    })
  }

  handleClick(index) {
    this.setState({ activeForm: index, formType: index })
  }

  renderForm() {
    switch(this.state.formType) {
      case 0:
        return (
          <SlideForm callback={this.createComponent.bind(this)} />
        )
      case 1:
        return (
          <QuizForm callback={this.createComponent.bind(this)} />
        )
      case 2:
        return (
          <MultimediaForm callback={this.createComponent.bind(this)} />
        )
    }
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.openEditModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header>
            <Modal.Title className='update-user-header'>New Component</Modal.Title>
            <div onClick={this.props.closeModal}><img className='list-image' src={Images.close_modal} /></div>
          </Modal.Header>
          <Modal.Body className='white'>
            <div className='flex flex-vertical'>
              <div className='add-component-body-text'>Type</div>
              <div className='flex flex-horizontal button-container'>
                <button className={`component-button ${this.state.activeForm == 0 ? ' active' : ''}`} onClick={this.handleClick.bind(this, 0)}>Slide</button>
                <button className={`component-button ${this.state.activeForm == 1 ? ' active' : ''}`} onClick={this.handleClick.bind(this, 1)}>Quiz</button>
                <button className={`component-button ${this.state.activeForm == 2 ? ' active' : ''}`} onClick={this.handleClick.bind(this, 2)}>Multimedia</button>
              </div>
              <div className='component-form'>{this.renderForm()}</div>
            </div>
          </Modal.Body>
          <Modal.Footer className='white'>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AddComponentForm
