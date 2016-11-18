import React from 'react'
import AudioComponent from './AudioComponent'


class ImageComponent extends React.Component {

  render() {
    return (
      <div>
        <p>This is a image component</p>
        <img src={this.props.imgUrl} alt="image not found"/>
        <AudioComponent audioUrl={this.props.audioUrl} callback={this.props.callback} />
      </div>
    )
  }
}

export default ImageComponent
