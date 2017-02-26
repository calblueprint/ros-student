import React from 'react'

import { getUser, setUser } from '../../../utils/user_helpers'
import { Images, convertImage } from '../../../utils/image_helpers'


class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.user = getUser()
    this.state = {
      activeIndex: 1,
      imageField: {
        imageData: {
          label: 'Profile Image',
          value: '',
          imageUrl: this.user.image_url,
        },
      },
    }

  }

  renderImage() {
    const imageState = this.state.imageField.imageData
    return imageState.value || imageState.imageUrl || Images.default_profile
  }

  renderChildren() {
    console.log(this.user.image_url)
    return this.props.children.map((child, i) => {
      return i == 0 ? (
        <div className="nav-element-container logo">
          {child}
        </div>
      ) : (
        <div className='nav-element-container right'>
          {child}
        </div>

      )
    })
  }

  render() {
    return (
      <nav className='nav'>
        <div className='flex center'>
          <div className='container'>
            {this.renderChildren()}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
