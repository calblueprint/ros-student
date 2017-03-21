import _ from 'underscore'
import React, { PropTypes } from 'react'
import ReactPlayer from 'react-player'

import { audioComponentProgress } from '../../utils/helpers/component_helpers'

import ProgressBar from '../../shared/components/widgets/ProgressBar'

class AudioComponent extends React.Component {
  constructor(props) {
    super(props)

    this.player = false
    this.state = {
      playing: false,
      progress: 0,
      duration: 0,
    }

    this.onAudioToggle = this.onAudioToggle.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onSeek = this.onSeek.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onDuration = this.onDuration.bind(this)
  }

  onDuration(seconds) {
    this.setState({ duration: seconds })
  }

  onProgress({ played }) {
    if (!played) {
      return
    }
    this.setState({ progress: played * 100 })
  }

  onSeek(e) {
    if (!this.props.canSeek) {
      return
    }

    const container = this.refs.audioContainer
    const percent = (e.clientX - container.offsetLeft) / container.offsetWidth

    const progress = percent >= 1 ? 100 : percent * 100;
    this.setState({ progress: progress }, () => {
      this.player.seekTo(progress)
    })
  }

  onAudioToggle() {
    this.setState({ playing: !this.state.playing })
  }

  onEnd() {
    this.setState({ playing: false, progress: 100 })
    this.props.callback()
  }

  startTime() {
    return audioComponentProgress(
      this.state.progress,
      this.state.duration
    )
  }

  endTime() {
    return audioComponentProgress(
      100,
      this.state.duration
    )
  }

  displayAudio() {
    return this.props.audioUrl && this.props.selfPaced
  }

  renderAudio() {
    if (this.displayAudio()) {
      return (
        <div className='audio-component-container padding-md'>
          <div id='audio-component' className='flex center fill'>
            <button
              className='button'
              onClick={this.onAudioToggle}>
              {this.state.playing ? 'Pause' : 'Play'}
            </button>
            <div className='flex flex-vertical fill marginLeft-sm'>
              <div
                ref='audioContainer'
                className='audio-progressbar-container'
                onClick={this.onSeek}
              >
                <ProgressBar progress={this.state.progress} />
              </div>
              <div className='fill'>
                <div className='audio-start-time'>{this.startTime()}</div>
                <div className='audio-end-time'>{this.endTime()}</div>
              </div>
            </div>

            <ReactPlayer
              ref={player => { this.player = player }}
              url={this.props.audioUrl}
              playing={this.state.playing}
              controls={true}
              hidden={true}
              progressFrequency={500}
              onEnded={this.onEnd}
              onProgress={this.onProgress}
              onDuration={this.onDuration}
            />
          </div>
        </div>
      )
    } else {
      return
    }
  }

  render() {
    return(
      <div>
        {this.renderAudio()}
      </div>
    )
  }
}

AudioComponent.propTypes = {
  callback: PropTypes.func.isRequired,
  audioUrl: PropTypes.string,
  selfPaced: PropTypes.bool.isRequired,
}

export default AudioComponent
