import React from 'react'

import Input from '../../shared/components/forms/Input'

class MultimediaForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 1,
      audioUrl: null,
      contentUrl: '',
      audioData: null,
      imageData: null,
    }

    this.updateContentURL = this.updateContentURL.bind(this)
  }

  updateContentURL(e) {
    this.setState({contentUrl: e.target.value})
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
          <div className='add-component-form-item'><Input type='text' label='Youtube Url' value={this.state.contentUrl} onChange={this.updateContentURL} /></div>
          <div className='add-component-form-item'><button className='button button--blue create-component-button' onClick={this.submit.bind(this)}>Create</button></div>
        </form>
      </div>
    )
  }
}

export default MultimediaForm
