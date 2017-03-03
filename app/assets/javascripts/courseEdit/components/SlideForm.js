import _ from 'underscore'
import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'
import Input from '../../shared/components/forms/Input'

class SlideForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      component: {
        componentType: 0,
        title: this.props.component.title,
      },

      imageUrl: this.props.component.image_data,
      audioUrl: this.props.component.audio_url,
    }

    this.updateImageData = this.updateImageData.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  setComponent(field, data) {
    const component = this.state.component
    component[field] = data
    this.setState({ component: component})
  }

  updateImageData(image) {
    this.setComponent('imageData', image)
  }

  updateAudioData(audio) {
    this.setComponent('audioData', audio)
  }

  updateTitle(e) {
    this.setComponent('title', e.target.value)
  }

  submit(e) {
    e.preventDefault()
    this.props.callback(this.state.component)
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

          {this.renderAudio()}

          <div className='add-component-form-item'>
            <AudioUploadInput
              label='Audio'
              onChange={this.updateAudioData}/>
          </div>

          <div className='add-component-form-item'>
            <button
              className='button button--blue create-component-button'
              onClick={this.submit.bind(this)}>
              Save
            </button>
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
