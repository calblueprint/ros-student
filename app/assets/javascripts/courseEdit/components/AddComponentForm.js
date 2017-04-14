import React from 'react'
import Modal from 'react-bootstrap-modal'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import Form from '../../shared/components/forms/Form'
import SlideForm from './SlideForm'
import QuizForm from './QuizForm'
import MultimediaForm from './MultimediaForm'
import { getInputToParams } from '../../utils/helpers/form_helpers'
import { Images } from '../../utils/helpers/image_helpers'
import ComponentForm from './ComponentForm'

class AddComponentForm extends ComponentForm {
  constructor(props) {
    super(props)
  }

  handleComponent(componentJson, successFunction, errorFunction) {
    const path = APIRoutes.createComponentPath(this.props.subsectionId)
    const componentParams = super.getComponentParams(componentJson)

    if (componentParams.component.image_data != null) {
      componentParams.component.photo_attributes = { image_data: componentParams.component.image_data }
    }

    request.post(path, componentParams, (response) => {
      this.props.callback(response)
      successFunction && successFunction()
    }, (error) => {
      console.log(error)
      errorFunction && errorFunction(error)
    })
  }

  render() {
    return super.render()
  }
}

export default AddComponentForm
