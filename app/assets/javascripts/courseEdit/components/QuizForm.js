import _ from 'underscore'
import React from 'react'

import Input from '../../shared/components/forms/Input'
import Form from '../../shared/components/forms/Form'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

import { mapErrorToFormFields } from '../../utils/helpers/form_helpers'

class QuizForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = _.extend(this.getFormFields(), {
      audioUrl: this.props.component.audio_url,
    })

    this.handleChange = this.handleChange.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
  }

  getFormFields() {
    return {
      formFields: {
        title: {
          label: 'Title',
          value: this.props.component.title,
          onChange: _.bind(this.handleChange, this, 'title'),
          error: '',
        },
        formKey: {
          label: 'Quiz Key',
          value: this.props.component.form_key,
          onChange: _.bind(this.handleChange, this, 'contentUrl'),
          error: '',
        },
        contentUrl: {
          label: 'Google Forms Url',
          value: this.props.component.content_url,
          onChange: _.bind(this.handleChange, this, 'contentUrl'),
          error: '',
        },
      }
    }
  }

  handleChange(attr, e) {
    const formFields = this.state.formFields
    formFields[attr].value = e.target.value
    this.setState({ formFields: formFields })
  }

  updateAudioData(audio) {
    this.setState({ audioUrl: audio })
  }

  submit(e) {
    e.preventDefault()

    const component = {
      componentType: 1,
      title: this.state.formFields.title.value,
      formKey: this.state.formFields.formKey.value,
      contentUrl: this.state.formFields.contentUrl.value,
      audioData: this.state.audioUrl ? this.state.audioUrl : null,
    }
    this.props.callback(component, null, this.setErrorFormFields.bind(this))
  }

  setErrorFormFields(error) {
    this.setState({
      formFields: mapErrorToFormFields(error, this.state.formFields)
    })
  }

  renderAudio() {
    const audio = this.state.audioUrl
    if (_.isNull(audio)) {
      return
    }

    return (
      <div className='add-component-form-item'>
        <audio src={audio} controls preload />
      </div>
    )
  }

  getIFrameOptions(shouldShowIFrame) {
    return shouldShowIFrame ? { display: 'none' } : {}
  }

  renderIFrame() {
    const shouldShowIFrame = !_.isEmpty(this.state.formFields.contentUrl.value)
    return (
      <div>
        <div style={this.getIFrameOptions(shouldShowIFrame)}>
          Enter form url for preview.
        </div>
        <div
          style={this.getIFrameOptions(!shouldShowIFrame)}
          className='form-component-container'
        >
          <iframe
            ref='iframe'
            className='form-iframe'
            src={this.props.component.content_url}
            sandbox='allow-scripts'
          >
            Loading...
          </iframe>
        </div>
      </div>
    )
  }


  render() {
    return (
      <div className='add-component-body-text'>
        <Form>
          <div className='add-component-form-item'>
            <Input {...this.state.formFields.title} />
          </div>

          <div className='add-component-form-item'>
            <Input {...this.state.formFields.contentUrl} />
          </div>

          <div className='add-component-form-item'>
            {this.renderIFrame()}
          </div>

          <div className='add-component-form-item'>
            <Input {...this.state.formFields.formKey} />
          </div>

          <div className='add-component-form-item'>
            <AudioUploadInput
              label="Audio"
              onChange={this.updateAudioData} />
            {this.renderAudio()}
          </div>

          <div className='add-component-form-item'>
            <button
              className='button button--blue create-component-button'
              onClick={this.submit.bind(this)}>
              Save
            </button>
          </div>
        </Form>
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
    formKey: '',
  },
}

export default QuizForm
