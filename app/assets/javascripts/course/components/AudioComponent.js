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
      <ReactPlayer
        className='flex center audio-component'
        url={this.props.audioUrl}
        playing={this.state.playing}
        controls={true}
        onEnded={this.onEnd}
        height='30'
        width='100%'
      />
    )
  }

  render() {
    return (
      <div className='flex center audio-component-container'>
        {!_.isUndefined(this.props.audioUrl) ? this.renderAudio() : ''}
      </div>
    )
  }
}

export default AudioComponent
