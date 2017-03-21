import _ from 'underscore'
import React from 'react'

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
          className='image'
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

export default Image
