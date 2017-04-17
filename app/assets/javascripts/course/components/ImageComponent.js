import React, { PropTypes } from 'react'
import AudioComponent from './AudioComponent'

import Image from '../../shared/components/widgets/Image'

class ImageComponent extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.id != nextProps.id) {
      this.markClassroomComplete(nextProps)
    }
  }

  componentDidMount() {
    this.markClassroomComplete(this.props)
  }

  markClassroomComplete(props) {
    if (!props.selfPaced || props.audioUrl == null) {
      props.onEnd()
    }
  }

  render() {
    return (
      <div className='image-component-container'>
        <div className='flex flex-vertical center'>
          <div className='fill marginBot-sm'>
            <Image src={this.props.imgUrl} />
          </div>
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
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  onEnd: PropTypes.func.isRequired,
  audioUrl: PropTypes.string,
  selfPaced: PropTypes.bool,
}

ImageComponent.defaultProps = {
  selfPaced: false,
}

export default ImageComponent
