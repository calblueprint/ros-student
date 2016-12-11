import _ from 'underscore'
import React, { PropTypes } from 'react'

import UploadInput from './UploadInput'

class AudioUploadInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      audio: '',
    }
    this.setChosenAudio = this.setChosenAudio.bind(this)
  }

  setChosenAudio(audio) {
    this.setState({ audio: audio })
    this.props.onChange(audio)
  }

  render() {
    return (
      <div>
        <div>{this.props.label}</div>
        <UploadInput
          accept='audio/mp3'
          onChange={this.setChosenAudio}
        />
      </div>
    )
  }
}

AudioUploadInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AudioUploadInput
