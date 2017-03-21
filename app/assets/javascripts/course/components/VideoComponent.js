import React, { PropTypes } from 'react'
import YouTube from 'react-youtube'
import ReactDOM from 'react-dom'
import AudioComponent from './AudioComponent'

import { getYoutubeKey } from '../../utils/helpers/component_helpers'

class VideoComponent extends React.Component {
  constructor(props) {
    super(props)

    this.onReady = this.onReady.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this)
    this.onAudioEnd = this.onAudioEnd.bind(this)
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
    if (this.state.videoEnd && (this.props.audioUrl == null || this.state.audioEnd)) {
      this.props.onEnd()
    }
  }

  onVideoEnd() {
    this.setState({ videoEnd: true })
    this.onEnd()
  }

  onAudioEnd() {
    this.setState({ audioEnd: true })
    this.onEnd()
  }

  render() {
    return (
      <div className='video-component-container'>
        <YouTube
          videoId={getYoutubeKey(this.props.videoUrl)}
          onReady={this.onReady}
          onEnd={this.onVideoEnd}
          opts={this.getConfigOptions()}
        />
        <AudioComponent
          audioUrl={this.props.audioUrl}
          callback={this.onAudioEnd}
          canSeek={this.props.canSeek}
          selfPaced={this.props.selfPaced}
        />
      </div>
    )
  }
}

VideoComponent.propTypes = {
  onEnd: PropTypes.func.isRequired,
  videoUrl: PropTypes.string.isRequired,
  audioUrl: PropTypes.string,
}

export default VideoComponent
