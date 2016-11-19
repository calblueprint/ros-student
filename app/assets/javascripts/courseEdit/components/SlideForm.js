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
      <div>
        <div>Image Component</div>
        <form>
          <ImageUploadInput label="Image" onChange={this.updateImageData}/>
          <AudioUploadInput label="Audio" onChange={this.updateAudioData} />
          <button onClick={this.submit.bind(this)}>Create</button>
        </form>
      </div>
    )
  }
}

export default SlideForm
