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

  renderImage() {
    if (this.props.image) {
      return (
        <img
          className='image-input'
          src={this.props.image}
        />
      )
    } else {
      return (
        <div
          className='flex center image-input image-empty'
          src={this.props.image}
        >
          <h1 className='h1'>Insert Image Here</h1>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='flex flex-vertical center image-input-flex'>
          <div className='input-label marginTopBot-xs'>{this.props.label}</div>
          <div className='image-input-container'>

            {this.renderImage()}

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
  image: PropTypes.string,
  label: PropTypes.string.isRequired,

  setImage: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default ImageUploadInput
