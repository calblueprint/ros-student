import _ from 'underscore'
import React from 'react'
import ReactPlayer from 'react-player'

class AudioComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = { playing: true }
    this.onEnd = this.onEnd.bind(this)
  }

  onEnd() {
    this.setState({ playing: false })
    this.props.callback()
  }

  renderAudio() {
    return (
      <div>
        <p>This is an audio component</p>
        <a href={this.props.audioUrl}>audio link</a>
        <ReactPlayer
          url={this.props.audioUrl}
          playing={this.state.playing}
          controls={true}
          height={0}
          onEnded={this.onEnd}
        />
      </div>
    )
  }

  render() {
    return (
      <div>
        {!_.isUndefined(this.props.audioUrl) ? this.renderAudio : ''}
      </div>
    )
  }
}

export default AudioComponent
