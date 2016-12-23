import React from 'react'
import AudioComponent from './AudioComponent'

class ImageComponent extends React.Component {
  render() {
    return (
      <div className='flex center flex-vertical'>
        <img
          className='image-component-image'
          src={this.props.imgUrl}
          alt="image not found"
        />
        <AudioComponent
          audioUrl={this.props.audioUrl}
          callback={this.props.onEnd}
        />
      </div>
    )
  }
}

export default ImageComponent
