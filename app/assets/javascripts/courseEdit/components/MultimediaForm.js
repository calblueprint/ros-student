import React from 'react'

import Input from '../../shared/components/forms/Input'

class MultimediaForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 1,
      audioUrl: null,
      contentUrl: null,
      audioData: null,
      imageData: null
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
      <div>
        <div>Multimedia Component</div>
        <form>
          <Input type='text' label='Youtube Url' value={this.state.contentUrl} onChange={this.updateContentURL} />
          <button onClick={this.submit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default MultimediaForm
