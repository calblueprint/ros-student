import _ from 'underscore'
import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'
import Input from '../../shared/components/forms/Input'
import Form from '../../shared/components/forms/Form'
import SaveButton from '../../shared/components/widgets/SaveButton'

import { mapErrorToFormFields, getFormErrors } from '../../utils/helpers/form_helpers'

class SlideForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = _.extend(this.getFormFields(), {
      imageUrl: this.props.component.image_data,
      audioUrl: this.props.component.audio_url,
    })

    this.handleChange = this.handleChange.bind(this)

    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateImageData = this.updateImageData.bind(this)
    this.submit = this.submit.bind(this)
    this.setErrorFormFields = this.setErrorFormFields.bind(this)
  }

  getFormFields() {
    return {
      formFields: {
        title: {
          label: 'Title',
          value: this.props.component.title,
          onChange: _.bind(this.handleChange, this, 'title'),
          error: '',
        },
        photo: {
          error: '',
        },
      }
    }
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  updateImageData(image) {
    this.setState({ imageUrl: image })
  }

  updateAudioData(audio) {
    this.setState({ audioUrl: audio })
  }

  submit(event, successFunction, errorFunction) {
    event.preventDefault()

    const component = {
      componentType: 0,
      title: this.state.formFields.title.value,
      audio: this.state.audioUrl ? this.state.audioUrl : null,
      imageData: this.state.imageUrl,
    }

    this.props.callback(component, successFunction, (error) => {
      errorFunction(error)
      this.setErrorFormFields(error)
    })

    console.log(this.state.formFields)
  }

  setErrorFormFields(error) {
    this.setState({
      formFields: mapErrorToFormFields(error, this.state.formFields)
    })
  }

  renderAudio() {
    const audio = this.state.audioUrl
    if (_.isNull(audio)) {
      return
    }

    return (
      <div className='add-component-form-item'>
        <audio src={audio} controls preload />
      </div>
    )
  }

  render() {
    return (
      <div className='add-component-body-text'>
        <Form>
          <div className='add-component-form-item'>
            <Input {...this.state.formFields.title} />
          </div>

          <div className='add-component-form-item'>
            <ImageUploadInput
              label='Image'
              image={this.state.imageUrl}
              setImage={this.updateImageData}
              error={this.state.formFields.photo.error}/>
          </div>

          <div className='add-component-form-item'>
            <AudioUploadInput
              label='Audio'
              onChange={this.updateAudioData}/>
            {this.renderAudio()}
          </div>

          <div className='add-component-form-item'>
            <SaveButton
              text="Save"
              onPress={this.submit}
              className='create-component-button'
            />
          </div>
        </Form>
      </div>
    )
  }
}

SlideForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: null,
    audioData: null,
    imageData: null,
  },
}

export default SlideForm
