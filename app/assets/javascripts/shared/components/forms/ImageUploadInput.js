import _ from 'underscore'
import React, { PropTypes } from 'react'

import UploadInput from './UploadInput'

class ImageUploadInput extends React.Component {
  constructor(props) {
    super(props)
    this.setChosenImage = this.setChosenImage.bind(this)
  }

  setChosenImage(image) {
    this.props.onChange(image)
  }

  render() {
    return (
      <div className={this.props.className}>
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
  className: PropTypes.string,
}

export default ImageUploadInput
