import _ from 'underscore'
import React, { PropTypes } from 'react'

class Image extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      src: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.preloadImage(nextProps.src)
  }

  componentDidMount() {
    this.preloadImage(this.props.src)
  }

  preloadImage(src) {
    const downloadingImage = new window.Image()

    downloadingImage.onload = _.partial(function(context) {
      context.setState({ loaded: true, src: this.src })
    }, this)

    downloadingImage.src = src
  }

  getImageStyle() {
    return this.state.loaded ? 'image' : 'image hidden'
  }

  renderSpinner() {
    return (
      <div className='flex center loader-container'>
        <div className='loader' />
      </div>
    )
  }

  renderImage() {
    return (
      <div className='image-container'>
        <img
          className={`image ${this.props.img_style}`}
          src={this.state.src}
          alt='Image not found.'
        />
      </div>
    )
  }

  render() {
    return this.state.loaded ? this.renderImage() : this.renderSpinner()
  }
}

Image.propTypes = {
  src: PropTypes.string,
  img_style: PropTypes.string,
}

export default Image
