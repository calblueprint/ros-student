import _ from 'underscore'
import YouTube from 'react-youtube'
import React from 'react'

import Input from '../../shared/components/forms/Input'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

import { getYoutubeKey } from '../../utils/helpers/component_helpers'

class MultimediaForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      component: {
        componentType: 2,
        title: this.props.component.title,
        contentUrl: this.props.component.content_url,
      },

      audioUrl: this.props.component.audio_url,
    }

    this.updateContentURL = this.updateContentURL.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  setComponent(field, data) {
    const component = this.state.component
    component[field] = data
    this.setState({ component: component})
  }

  updateContentURL(e) {
    this.setComponent('contentUrl', e.target.value)
  }

  updateTitle(e) {
    this.setComponent('title', e.target.value)
  }

  updateAudioData(audio) {
    this.setComponent('audioData', audio)
  }

  submit(e) {
    e.preventDefault()
    this.props.callback(this.state.component)
  }

  renderAudio() {
    const audio = this.state.component.audioData || this.state.audioUrl
    if (_.isNull(audio)) {
      return
    }

    return (
      <div className='add-component-form-item'>
        <audio src={audio} controls preload />
      </div>
    )
  }

  renderPreview() {
    const youtubeKey = getYoutubeKey(this.state.component.contentUrl)
    if (youtubeKey) {
      return (
        <div>
          <YouTube videoId={youtubeKey} />
        </div>
      )
    } else {
      return (
        <div>No Preview Avaliable</div>
      )
    }
  }

  render() {
    const audio = this.state.component.audioData || this.state.audioUrl

    return (
      <div className='add-component-body-text'>
        <form>
          <div className='add-component-form-item'>
            <Input
              label='Title'
              value={this.state.component.title}
              onChange={this.updateTitle}/>
          </div>

          <div className='add-component-form-item'>
            <Input
              label='Youtube Url'
              value={this.state.component.contentUrl}
              onChange={this.updateContentURL} />
          </div>

          {this.renderPreview()}

          <div className='add-component-form-item'>
            <AudioUploadInput
              label="Audio"
              onChange={this.updateAudioData}/>
            {this.renderAudio()}
          </div>

          <div className='add-component-form-item'>
            <button
              className='button button--blue create-component-button'
              onClick={this.submit.bind(this)}>
              Save
            </button>
          </div>
        </form>
      </div>
    )
  }
}

MultimediaForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: '',
    contentUrl: '',
  },
}

export default MultimediaForm
