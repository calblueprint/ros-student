import _ from 'underscore'
import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'
import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'

class SlideForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = _.extend(this.getFormFields(), {
      imageUrl: this.props.component.image_data,
      audioUrl: this.props.component.audio_url,
    })

    this.handleChange = this.handleChange.bind(this)

    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.submit = this.submit.bind(this)
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
      contentUrl: this.state.formFields.contentUrl.value,
      audio: this.state.audioUrl ? this.state.audioUrl : null,
      imageData: this.state.imageUrl,
    }

    this.props.callback(component, success, (error) => {
      errorFunction(error)
      this.setErrorFormFields(error)
    }.bind(this))
  }

  setErrorFormFields(error) {
    this.setState({
      formFields: mapErrorToFormFields(error, this.state.formFields)
    })
  }

  renderAudio() {
    const audio = this.state.component.audioData || this.state.audioUrl
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
        <form>
          <div className='add-component-form-item'>
            <Input
              className='text-input'
              label='Title'
              value={this.state.component.title}
              onChange={this.updateTitle}
            />
          </div>

          <div className='add-component-form-item'>
            <ImageUploadInput
              label='Image'
              image={this.state.component.imageData || this.state.imageUrl}
              setImage={this.updateImageData}/>
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
        </form>
      </div>
    )
  }
}

SlideForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: null,
    contentUrl: null,
    audioData: null,
    imageData: null,
  },
}

export default SlideForm
