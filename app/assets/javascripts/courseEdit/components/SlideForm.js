import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

class SlideForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 0,
      audioUrl: null,
      contentUrl: null,
      audioData: null,
      imageData: null
    }

    this.updateImageData = this.updateImageData.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
  }

  updateImageData(image) {
    this.setState({imageData: image})
  }

  updateAudioData(audio) {
    this.setState({audioData: audio})
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
          <div className='add-component-form-item'><ImageUploadInput label="Image" onChange={this.updateImageData}/></div>
          <div className='add-component-form-item'><AudioUploadInput label="Audio" onChange={this.updateAudioData}/></div>
          <div className='add-component-form-item'><button className='button button--blue' onClick={this.submit.bind(this)}>Create</button></div>
        </form>
      </div>
    )
  }
}

export default SlideForm
