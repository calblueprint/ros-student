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
import ComponentForm from './ComponentForm'

class EditComponentForm extends ComponentForm {
  constructor(props) {
    super(props)
    this.state = {
      component: this.props.component,
    }
  }

  handleComponent(componentJson) {
    const path = APIRoutes.editComponentPath(this.props.component.id)

    const componentParams = super.getComponentParams(componentJson)
    
    if (componentParams.component.image_data != null) {
      componentParams.component.photo_attributes = { image_data: componentParams.component.image_data }
    }
    request.update(path, componentParams, (response) => {
      this.props.callback(response)
    }, (error) => {
      console.log(error)
    })
  }

  render() {
    return super.render()
  }
}

export default EditComponentForm