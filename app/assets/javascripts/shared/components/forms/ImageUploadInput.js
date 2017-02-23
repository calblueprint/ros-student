import _ from 'underscore'
import React, { PropTypes } from 'react'

import { Images, convertImage } from '../../../utils/image_helpers'

class ImageUploadInput extends React.Component {
  constructor(props) {
    super(props)

    this.handleImage = this.handleImage.bind(this)
    this.removeImage = this.removeImage.bind(this)
  }

  handleImage(e) {
    convertImage(e, this.props.setImage)
  }

  removeImage(e) {
    e.preventDefault()
    this.props.setImage('')
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='flex flex-vertical center image-input-flex'>
          <div className='input-text marginTopBot-xs'>{this.props.label}</div>
          <div className='image-input-container'>
            <img
              className='image-input'
              src={this.props.image}
            />
            <div className='image-input-upload'>
              <button
                className='button button--red image-input-button margin'
                onClick={this.removeImage}
              >
                Remove Image
              </button>
              <label
                htmlFor='image-input-upload'
                className='button image-input-button'
                onChange={this.handleImage}
              >
                Upload Image
              </label>
              <input
                id='image-input-upload'
                className='hidden-input'
                type='file'
                onChange={this.handleImage}
                accept='image/jpg, image/jpeg, image/png'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ImageUploadInput.propTypes = {
  label: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default ImageUploadInput
