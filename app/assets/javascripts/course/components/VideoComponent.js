import React from 'react'
import YouTube from 'react-youtube'
import ReactDOM from 'react-dom'

import { getYoutubeKey } from '../../utils/component_helpers'

class VideoComponent extends React.Component {
  constructor(props) {
    super(props)

    this.onReady = this.onReady.bind(this);
  }

  getConfigOptions() {
    return {
      playerVars: {
        disablekb: this.props.canSeek ? 0 : 1,
        controls: this.props.canSeek ? 1 : 0,
      }
    }
  }

  onReady(event) {
    this.setState({ player: event.target })
  }

  onEnd() {
    this.props.onEnd()
  }

  render() {
    return (
      <div className='video-component-container'>
        <YouTube
          videoId={getYoutubeKey(this.props.videoUrl)}
          onReady={this.onReady}
          onEnd={this.props.onEnd}
          opts={this.getConfigOptions()}
        />
      </div>
    )
  }
}

export default VideoComponent
