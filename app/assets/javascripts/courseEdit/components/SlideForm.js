import React from 'react'

import ImageUploadInput from '../../shared/components/forms/ImageUploadInput'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

class SlideForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 0,
      audioUrl: null,
      contentUrl: null
    }
  }

  submit() {
    this.setState(bs)
    this.props.callback(this.state)
  }

  render() {
    return (
      <div>
        <div>Slide Component</div>
        <form>
          <input type="text" name="name" value="" placeholder="Name"></input>
          <ImageUploadInput label="Image" />
          <AudioUploadInput label="Audio" />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default SlideForm
