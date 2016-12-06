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
import { formatComponent } from '../../utils/component_helpers'

class ComponentForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      formType: this.props.component.component_type,
    }
  }

  getComponentParams(componentJson) {
    const form = {
      componentType: { value: componentJson.componentType },
      title: { value: componentJson.title },
      formKey: { value: componentJson.formKey },
      audioUrl: { value: componentJson.audioUrl },
      contentUrl: { value: componentJson.contentUrl },
      subsectionId: { value: this.props.subsectionId },
      audioData: { value: componentJson.audioData },
    }
    const componentParams = { component: getInputToParams(form) }

    if (componentJson.imageData != null) {
      componentParams.component.photo_attributes = {
        image_data: componentJson.imageData
      }
    }

    return componentParams
  }

  handleClick(index) {
    this.setState({ formType: index })
  }

  isActiveStyle(index) {
    return this.state.formType == index ? ' active' : ''
  }

  renderForm() {
    switch(this.state.formType) {
      case 0:
        return (
          <SlideForm
            callback={this.handleComponent.bind(this)}
            component={this.props.component} />
        )
      case 1:
        return (
          <QuizForm callback={this.handleComponent.bind(this)} component={this.props.component} />
        )
      case 2:
        return (
          <MultimediaForm callback={this.handleComponent.bind(this)} component={this.props.component} />
        )
    }
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.openComponentForm}
          onHide={this.props.closeModal}
        >
          <Modal.Header>
            <Modal.Title className='update-user-header'>
              Component Form
            </Modal.Title>
            <img
              onClick={this.props.closeModal}
              className='modal-close'
              src={Images.close_modal} />
          </Modal.Header>
          <Modal.Body className='white'>
            <div className='flex flex-vertical'>
              <div className='add-component-body-text'>Type</div>
              <div className='flex flex-horizontal button-container'>
                <button
                  className={`component-button ${this.isActiveStyle(0)}`}
                  onClick={this.handleClick.bind(this, 0)}>
                  Slide
                </button>
                <button
                  className={`component-button ${this.isActiveStyle(1)}`}
                  onClick={this.handleClick.bind(this, 1)}>
                  Quiz
                </button>
                <button
                  className={`component-button ${this.isActiveStyle(2)}`}
                  onClick={this.handleClick.bind(this, 2)}>
                  Multimedia
                </button>
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

ComponentForm.defaultProps = {
  formType: 0,
  component: {
    component_type: 0,
    title: '',
    audio_url: null,
    content_url: null,
    form_key: '',
  }
}

export default ComponentForm
