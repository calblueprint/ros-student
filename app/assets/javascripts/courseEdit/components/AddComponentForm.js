import React from 'react'

import { APIRoutes } from '../../shared/routes'
import request from '../../shared/requests/request'

import SlideForm from './SlideForm'
import QuizForm from './QuizForm'
import MultimediaForm from './MultimediaForm'
import { getInputToParams } from '../../utils/form_helpers'

class AddComponentForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      formType: 0,
      subsectionId: this.props.subsectionId
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
      this.props.onFormCompletion(response)
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
        break;
      case 1:
        return (
          <MultimediaForm callback={this.createComponent.bind(this)} />
        )
        break;
      case 2:
        return (
          <QuizForm callback={this.createComponent.bind(this)} />
        )
        break;
    }

  }

  changeFormType(n) {
    this.setState({formType: n})
  }


  render() {
    return (
      <div>
        <button onClick={this.changeFormType.bind(this, 0)}>Slide</button>
        <button onClick={this.changeFormType.bind(this, 1)}>Multimedia</button>
        <button onClick={this.changeFormType.bind(this, 2)}>Quiz</button>
        {this.renderForm()}
      </div>
    )
  }
}

export default AddComponentForm
