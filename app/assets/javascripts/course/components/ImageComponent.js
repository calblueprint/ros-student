import React from 'react'
import AudioComponent from './AudioComponent'


class ImageComponent extends React.Component {

  constructor(props) {
    super(props)

    this.imgUrl = this.props.imgUrl
    this.audioUrl = this.props.audioUrl
  }

  render() {
    return (
      <div>
        <p>This is a image component</p>
        <img src={this.imgUrl} />
        <AudioComponent audioUrl={this.audioUrl} callback={this.props.callback} />
      </div>
    )
  }
}

export default ImageComponent
