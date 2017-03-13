import React, { PropTypes } from 'react'

import { Images } from '../../../utils/helpers/image_helpers'

class RootsLogo extends React.Component {
  constructor(props) {
    super(props)
  }

  getContainerStyle() {
    return { width: this.props.size, height: this.props.size }
  }

  render() {
    return (
      <div className='roots-logo-container' style={this.getContainerStyle()}>
        <img className='roots-logo-svg circle' src={Images.circle} />
        <img className='roots-logo-svg book-left' src={Images.bookLeft} />
        <img className='roots-logo-svg book-right' src={Images.bookRight} />
        <img className='roots-logo-svg book-spine' src={Images.bookSpine} />
        <img className='roots-logo-svg page1' src={Images.page1} />
        <img className='roots-logo-svg page2' src={Images.page2} />
        <img className='roots-logo-svg page3' src={Images.page3} />
        <img className='roots-logo-svg page4' src={Images.page4} />
        <img className='roots-logo-svg page5' src={Images.page5} />
      </div>
    )
  }
}

RootsLogo.propTypes = {
  size: PropTypes.number.isRequired,
}

export default RootsLogo
