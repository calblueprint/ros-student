import React from 'react'
import Modal from 'react-bootstrap-modal'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import SlideForm from './SlideForm'
import QuizForm from './QuizForm'
import MultimediaForm from './MultimediaForm'
import { getInputToParams } from '../../utils/form_helpers'

class AddComponentForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formType: 0,
      subsectionId: this.props.subsectionId,
      isModalOpen: false,
    }
  }

  createComponent(componentJson) {
    const path = APIRoutes.createComponentPath(this.props.subsectionId)

    const form = {
      componentType: { value: componentJson.componentType },
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

  changeFormType(n) {
    this.setState({formType: n})
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.openEditModal}
          onHide={this.props.closeModal}
        >
          <Modal.Header>
            <Modal.Title className='update-user-header'>Add New Component</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='flex flex-vertical'>
              <div>Type</div>
              <div className='flex flex-horizontal'>
                <button onClick={this.changeFormType.bind(this, 0)}>Slide</button>
                <button onClick={this.changeFormType.bind(this, 1)}>Quiz</button>
                <button onClick={this.changeFormType.bind(this, 2)}>Multimedia</button>
              </div>
              <div className='component-form'>{this.renderForm()}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className='flex flex-horizontal'>
              <div>
                <input
                  type='submit'
                  className='button button--red marginTop-xs update-user-button'
                  value='Cancel'
                  onClick={this.props.closeModal}
                />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AddComponentForm
