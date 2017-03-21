import React, { PropTypes } from 'react'
import AudioComponent from './AudioComponent'

import Image from '../../shared/components/widgets/Image'

class ImageComponent extends React.Component {
  render() {
    return (
      <div className='flex flex-vertical center image-component-container'>
        <div className='fill marginBot-sm'>
          <Image src={this.props.imgUrl} />
        </div>
        <AudioComponent
          audioUrl={this.props.audioUrl}
          callback={this.props.onEnd}
          canSeek={this.props.canSeek}
          selfPaced={this.props.selfPaced}
        />
      </div>
    )
  }
}

ImageComponent.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
  audioUrl: PropTypes.string,
}

export default ImageComponent
