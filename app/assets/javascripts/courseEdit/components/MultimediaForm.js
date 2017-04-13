import _ from 'underscore'
import YouTube from 'react-youtube'
import React from 'react'

import Input from '../../shared/components/forms/Input'
import Form from '../../shared/components/forms/Form'

import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

import { mapErrorToFormFields } from '../../utils/helpers/form_helpers'
import { getYoutubeKey } from '../../utils/helpers/component_helpers'

class MultimediaForm extends React.Component {

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
        contentUrl: {
          label: 'Youtube Url',
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
      componentType: 2,
      title: this.state.formFields.title.value,
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
    if (_.isNull(this.state.audioUrl)) {
      return
    }

    return (
      <div className='add-component-form-item'>
        <audio src={this.state.audioUrl} controls preload />
      </div>
    )
  }

  renderPreview() {
    const youtubeKey = getYoutubeKey(this.state.formFields.contentUrl.value)
    if (youtubeKey) {
      return (
        <div>
          <YouTube videoId={youtubeKey} />
        </div>
      )
    } else {
      return (
        <div>No Preview Available</div>
      )
    }
  }

  render() {
    const audio = this.state.audioUrl
    return (
      <div className='add-component-body-text'>
        <Form>
          <div className='add-component-form-item'>
            <Input {...this.state.formFields.title} />
          </div>

          <div className='add-component-form-item'>
            <Input {...this.state.formFields.contentUrl} />
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
        </Form>
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
