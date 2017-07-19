import React from 'react'
import Modal from 'react-bootstrap-modal'

import { APIRoutes } from '../../shared/routes'
import { camelToSnake } from '../../utils/helpers/form_helpers'
import { Images } from '../../utils/helpers/image_helpers'
import { formatComponent } from '../../utils/helpers/component_helpers'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import SlideForm from './SlideForm'
import QuizForm from './QuizForm'
import MultimediaForm from './MultimediaForm'

class ComponentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
      formType: this.props.component.component_type,
    }
  }

  getComponentParams(componentJson) {
    const componentParams = { component: camelToSnake(componentJson) }

    if (componentJson.imageData != null) {
      componentParams.component.photo_attributes = {
        image_data: componentJson.imageData
      }
      delete componentParams.imageData
    }

    return componentParams
  }

  handleClick(index) {
    this.setState({ formType: index })
  }

  isActiveStyle(index) {
    return this.state.formType == index ? 'active' : ''
  }

  renderForm() {
    switch(this.state.formType) {
      case 0:
        return (
          <SlideForm
            callback={this.handleComponent.bind(this)}
            component={formatComponent(this.props.component)}
          />
        )
      case 1:
        return (
          <QuizForm
            callback={this.handleComponent.bind(this)}
            component={formatComponent(this.props.component)}
          />
        )
      case 2:
        return (
          <MultimediaForm
            callback={this.handleComponent.bind(this)}
            component={formatComponent(this.props.component)}
          />
        )
    }
  }

  renderItem() {
    return (
      <div className='flex flex-vertical add-component-container'>
        <div className='input-label marginTopBot-xxs'>Type</div>
        <div className='flex flex-horizontal'>
          <button
            className={`tab ${this.isActiveStyle(0)}`}
            onClick={this.handleClick.bind(this, 0)}>
            Slide
          </button>
          <button
            className={`tab ${this.isActiveStyle(1)}`}
            onClick={this.handleClick.bind(this, 1)}>
            Quiz
          </button>
          <button
            className={`tab ${this.isActiveStyle(2)}`}
            onClick={this.handleClick.bind(this, 2)}>
            Multimedia
          </button>
        </div>
        <div className='component-form'>{this.renderForm()}</div>
      </div>
    )
  }

  renderDisabled() {
    return (
      <div>
        This course has already been published - adding components is now disabled so that those already taking the course won't be affected. If you'd like to make changes, unpublish the course first.
      </div>
    )
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
            <Modal.Dismiss
              className='flex center modal-dismiss-container'
              onClick={this.closeModal}>
              <img
                src={Images.close_modal}
                className='modal-dismiss'/>
            </Modal.Dismiss>
          </Modal.Header>
          <Modal.Body>
            {this.props.disabled ? this.renderDisabled() : this.renderItem()}
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
  },
  disabled: false,
}

export default ComponentForm
