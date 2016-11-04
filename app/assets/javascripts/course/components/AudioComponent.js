import React from 'react'
import ReactPlayer from 'react-player'

class AudioComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = { playing: true }
    this.audioUrl = this.props.audioUrl
  }


  onEnd() {
    this.setState({ playing: false })
    this.props.callback()
  }

  render() {

    return (
      <div>
        <p>This is an audio component</p>
        <a href={this.audioUrl}>audio link</a>
        <ReactPlayer
          ref={player => { this.player = player }}
          url={this.audioUrl}
          playing={this.state.playing}
          controls={true}
          height={0}
          onEnded={this.onEnd.bind(this)}
        />
      </div>
    )
  }
}

export default AudioComponent
