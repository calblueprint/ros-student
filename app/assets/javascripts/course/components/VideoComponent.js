import React from 'react'
import YouTube from 'react-youtube'
import ReactDOM from 'react-dom'

import { getYoutubeKey } from '../../utils/component_helpers'

class VideoComponent extends React.Component {
  constructor(props) {
    super(props)

    this.onReady = this.onReady.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  getConfigOptions() {
    return {
      playerVars: {
        controls: this.props.canSeek ? 1 : 0,
      }
    }
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
  }

  onEnd() {
    this.props.onEnd()
  }

  render() {
    return (
      <div>
        <YouTube
          videoId={getYoutubeKey(this.props.videoUrl)}
          onReady={this.onReady}
          onEnd={this.onEnd}
          opts={this.getConfigOptions()}
        />
      </div>
    )
  }
}

export default VideoComponent
