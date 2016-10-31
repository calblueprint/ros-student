import _ from 'underscore'
import React from 'react'

class ImageUploadInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      image: '',
    }

    this.setChosenImage = this.setChosenImage.bind(this)
  }

  setChosenImage(e) {
    const files = e.target.files
    if (!files || !files[0]) {
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      this.setState({ image: e.target.result })
      this.props.onUploadedImage(e.target.result)
    }
    reader.readAsDataURL(files[0])
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
        <input
          type='file'
          onChange={this.setChosenImage}
          accept='image/*'
        />
      </div>
    )
  }
}

export default ImageUploadInput
