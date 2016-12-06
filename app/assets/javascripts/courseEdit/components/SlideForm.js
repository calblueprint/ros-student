import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'
import Input from '../../shared/components/forms/Input'

class SlideForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      componentType: 0,
      title: this.props.component.title,
      audioUrl: this.props.component.audio_url,
      contentUrl: this.props.component.content_url,
      audioData: this.props.component.audio_url,
      imageData: this.props.component.image_data
    }

    this.updateImageData = this.updateImageData.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  updateImageData(image) {
    this.setState({ imageData: image })
  }

  updateAudioData(audio) {
    this.setState({ audioData: audio })
  }

  updateTitle(e) {
    this.setState({ title: e.target.value })
  }

  submit(e) {
    e.preventDefault()
    this.props.callback(this.state)
  }

  render() {
    return (
      <div className='add-component-body-text'>
        <div>Slide Component</div>
        <form>
          <div className='add-component-form-item'>
            <Input
              className='text-input'
              label='Title' value={this.state.title}
              onChange={this.updateTitle}/>
          </div>
          <div className='add-component-form-item'>
            <ImageUploadInput
              label="Image"
              onChange={this.updateImageData}/>
          </div>
          <div className='component-image-container'>
            <img className='component-image' src={this.state.imageData} />
          </div>
          <div className='add-component-form-item'>
            <AudioUploadInput
              label="Audio"
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
