import _ from 'underscore'
import React from 'react'

import Input from '../../shared/components/forms/Input'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

class QuizForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      component: {
        componentType: 1,
        title: this.props.component.title,
        formKey: this.props.component.form_key,
        contentUrl: this.props.component.content_url,
      },

      audioUrl: this.props.component.audio_url,
    }

    this.updateContentURL = this.updateContentURL.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateQuizKey = this.updateQuizKey.bind(this)
  }

  setComponent(field, data) {
    const component = this.state.component
    component[field] = data
    this.setState({ component: component})
  }

  updateContentURL(e) {
    this.setComponent('contentUrl', e.target.value)
  }

  updateAudioData(audio) {
    this.setComponent('audioData', audio)
  }

  updateTitle(e) {
    this.setComponent('title', e.target.value)
  }

  updateQuizKey(e) {
    this.setComponent('formKey', e.target.value)
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


  render() {
    return (
      <div className='add-component-body-text'>
        <form>
          <div className='add-component-form-item'>
            <Input
              className='text-input'
              label='Title'
              value={this.state.component.title}
              onChange={this.updateTitle}/>
          </div>

          <div className='add-component-form-item'>
            <Input
              label='Google Forms URL'
              value={this.state.component.contentUrl}
              onChange={this.updateContentURL} />
          </div>

          <div className='add-component-form-item'>
            <Input
              label='Quiz Key'
              value={this.state.component.formKey}
              onChange={this.updateQuizKey}/>
          </div>

          {this.renderAudio()}

          <div className='add-component-form-item'>
            <AudioUploadInput
              label="Audio"
              onChange={this.updateAudioData} />
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

QuizForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: '',
    contentUrl: '',
    audioData: null,
    imageData: null,
    formKey: '',
  },
}

export default QuizForm
