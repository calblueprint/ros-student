import React from 'react'
import YouTube from 'react-youtube'
import ReactDOM from 'react-dom'

class VideoComponent extends React.Component {

  constructor(props) {
    super(props)

    this.onReady = this.onReady.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
  }

  onEnd() {
    this.props.callback()
  }

  render() {

    return (
      <div>
        <p>This is a video component</p>
        <YouTube videoId={this.props.videoUrl} onReady={this.onReady} onEnd={this.onEnd.bind(this)} />
      </div>
    )
  }
}

export default VideoComponent
