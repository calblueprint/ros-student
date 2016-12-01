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

class ComponentForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formType: 0,
      isModalOpen: false,
      activeForm: 0,
      componentType: this.props.component.componentType,
      title: this.props.component.title,
      audioUrl: this.props.component.audioUrl,
      contentUrl: this.props.component.contentUrl,
      audioData: this.props.component.audioData,
      imageData: this.props.component.imageData,
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
      imageData: { value: componentJson.imageData }
    }
    const componentParams = { component: getInputToParams(form) }

    return componentParams
  }

  handleClick(index) {
    this.setState({ activeForm: index, formType: index })
  }

  renderForm() {
    switch(this.state.formType) {
      case 0:
        return (
          <SlideForm callback={this.handleComponent.bind(this)} />
        )
      case 1:
        return (
          <QuizForm callback={this.handleComponent.bind(this)} />
        )
      case 2:
        return (
          <MultimediaForm callback={this.handleComponent.bind(this)} />
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
            <Modal.Title className='update-user-header'>Component Form</Modal.Title>
            <img
              onClick={this.props.closeModal}
              className='modal-close'
              src={Images.close_modal} />
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

ComponentForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: null,
    contentUrl: null,
    audioData: null,
    imageData: null,
  },
}

export default ComponentForm
