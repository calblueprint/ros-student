import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'
import Input from '../../shared/components/forms/Input'

class SlideForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 0,
      title: '',
      audioUrl: null,
      contentUrl: null,
      audioData: null,
      imageData: null
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
          <div className='add-component-form-item'><Input className='text-input' type='text' label='Title' value={this.state.title} onChange={this.updateTitle}/></div>
          <div className='add-component-form-item'><ImageUploadInput label="Image" onChange={this.updateImageData}/></div>
          <div className='add-component-form-item'><AudioUploadInput label="Audio" onChange={this.updateAudioData}/></div>
          <div className='add-component-form-item'><button className='button button--blue create-component-button' onClick={this.submit.bind(this)}>Create</button></div>
        </form>
      </div>
    )
  }
}

export default SlideForm
