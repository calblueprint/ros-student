import React from 'react'

import Input from '../../shared/components/forms/Input'
import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

class QuizForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 1,
      title: this.props.component.title,
      audioUrl: this.props.component.audioUrl,
      contentUrl: this.props.component.contentUrl,
      audioData: this.props.component.audioData,
      imageData: this.props.component.imageData,
      formKey: this.props.component.formKey
    }

    this.updateContentURL = this.updateContentURL.bind(this)
    this.updateAudioData = this.updateAudioData.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateQuizKey = this.updateQuizKey.bind(this)
  }

  updateContentURL(e) {
    this.setState({contentUrl: e.target.value})
  }

  updateAudioData(audio) {
    this.setState({audioData: audio})
  }

  updateTitle(e) {
    this.setState({title: e.target.value})
  }

  updateQuizKey(e) {
    this.setState({formKey: e.target.value})
  }

  submit(e) {
    e.preventDefault()
    this.props.callback(this.state)
  }

  render() {
    return (
      <div className='add-component-body-text'>
        <div>Quiz Component</div>
        <form>
          <div className='add-component-form-item'><Input className='text-input' type='text' label='Title' value={this.state.title} onChange={this.updateTitle}/></div>
          <div className='add-component-form-item'><Input type='text' label='Google Forms URL' value={this.state.contentUrl} onChange={this.updateContentURL} /></div>
          <div className='add-component-form-item'><AudioUploadInput label="Audio" onChange={this.updateAudioData} /></div>
          <div className='add-component-form-item'><Input type='text' label='Quiz Key' value={this.state.formKey} onChange={this.updateQuizKey}/></div>
          <div className='add-component-form-item'><button className='button button--blue create-component-button' onClick={this.submit.bind(this)}>Save</button></div>
        </form>
      </div>
    )
  }
}

QuizForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: null,
    contentUrl: null,
    audioData: null,
    imageData: null,
    formKey: '',
  },
}

export default QuizForm
