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
    console.log('loaded')
    this.setState({ audio: audio })
    this.props.onChange(audio)
  }

  renderAudio() {
    if (!_.isEmpty(this.state.audio)) {
      return (
        <audio controls>
          <source src={this.state.audio} />
        </audio>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderAudio()}
        <div>{this.props.label}</div>
        <UploadInput
          accept='audio/*'
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
