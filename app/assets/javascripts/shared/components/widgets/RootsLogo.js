import React, { PropTypes } from 'react'

import { Images } from '../../../utils/image_helpers'

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
        <img className='roots-logo-svg' src={Images.circle} />
        <img className='roots-logo-svg' src={Images.bookLeft} />
        <img className='roots-logo-svg' src={Images.bookRight} />
        <img className='roots-logo-svg' src={Images.bookSpine} />
        <img className='roots-logo-svg' src={Images.page1} />
        <img className='roots-logo-svg' src={Images.page2} />
        <img className='roots-logo-svg' src={Images.page3} />
        <img className='roots-logo-svg' src={Images.page4} />
        <img className='roots-logo-svg' src={Images.page5} />
      </div>
    )
  }
}

RootsLogo.propTypes = {
  size: PropTypes.number.isRequired,
}

export default RootsLogo
