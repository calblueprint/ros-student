import _ from 'underscore'
import React from 'react'
import ReactPlayer from 'react-player'

class AudioComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      playing: false
    }

    this.onEnd = this.onEnd.bind(this)
  }

  onEnd() {
    this.setState({ playing: false })
    this.props.callback()
  }

  renderAudio() {
    return (
      <div>
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
        {!_.isUndefined(this.props.audioUrl) ? this.renderAudio() : ''}
      </div>
    )
  }
}

export default AudioComponent
