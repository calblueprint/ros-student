import _ from 'underscore'
import React, { PropTypes } from 'react'

import UploadInput from './UploadInput'

class ImageUploadInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
    }

    this.setChosenImage = this.setChosenImage.bind(this)
  }

  setChosenImage(image) {
    this.setState({ image: image })
    this.props.onChange(image)
  }

  renderImage() {
    if (!_.isEmpty(this.state.image)) {
      return <img src={this.state.image} />
    }
  }

  render() {
    return (
      <div>
        {this.renderImage()}
        <div>{this.props.label}</div>
        <UploadInput
          onChange={this.setChosenImage}
          accept='image/jpg, image/jpeg, image/png'
        />
      </div>
    )
  }
}

ImageUploadInput.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ImageUploadInput
