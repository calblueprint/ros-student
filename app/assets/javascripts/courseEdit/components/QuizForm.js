import React from 'react'

import Input from '../../shared/components/forms/Input'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

class QuizForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 2,
      audioUrl: null,
      contentUrl: null,
      audioData: null,
      imageData: null
    }

    this.updateContentURL = this.updateContentURL.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
  }

  updateContentURL(e) {
    this.setState({contentUrl: e.target.value})
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
        <div>Quiz Component</div>
        <form>
          <Input type='text' label='Google Forms URL' value={this.state.contentUrl} onChange={this.updateContentURL} />
          <AudioUploadInput label="Audio" onChange={this.updateAudioData} />
          <button onClick={this.submit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default QuizForm