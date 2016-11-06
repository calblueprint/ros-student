import React from 'react'

import AudioUploadInput from '../../shared/components/forms/AudioUploadInput'

class QuizForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      componentType: 2,
      audioUrl: null,
      contentUrl: null
    }
  }

  render() {
    return (
      <div>
        <div>Quiz Component</div>
        <form>
          <input type="text" name="name" value="" placeholder="Name"></input>
          <input type="text" name="name" value="" placeholder="Google Forms URL"></input>
          <AudioUploadInput label="Audio" />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    )
  }
}

export default QuizForm
