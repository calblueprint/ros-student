import React from 'react'

import Input from '../../shared/components/forms/Input'

class MultimediaForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 2,
      title: this.props.component.title,
      audioUrl: this.props.component.audioUrl,
      contentUrl: this.props.component.contentUrl,
      audioData: this.props.component.audioData,
      imageData: this.props.component.imageData
    }

    this.updateContentURL = this.updateContentURL.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
  }

  updateContentURL(e) {
    this.setState({contentUrl: e.target.value})
  }

  updateTitle(e) {
    this.setState({title: e.target.value })
  }

  submit(e) {
    e.preventDefault()
    this.props.callback(this.state)
  }

  render() {
    return (
      <div className='add-component-body-text'>
        <div>Multimedia Component</div>
        <form>
          <div className='add-component-form-item'><Input type='text' label='Title' value={this.state.title} onChange={this.updateTitle}/></div>
          <div className='add-component-form-item'><Input type='text' label='Youtube Url' value={this.state.contentUrl} onChange={this.updateContentURL} /></div>
          <div className='add-component-form-item'><button className='button button--blue create-component-button' onClick={this.submit.bind(this)}>Save</button></div>
        </form>
      </div>
    )
  }
}

MultimediaForm.defaultProps = {
  component: {
    componentType: 0,
    title: '',
    audioUrl: null,
    contentUrl: null,
    audioData: null,
    imageData: null,
  },
}

export default MultimediaForm
