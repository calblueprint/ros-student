import React from 'react'

import { getUser, setUser } from '../../../utils/user_helpers'
import { Images, convertImage } from '../../../utils/image_helpers'
import { RailsRoutes, ReactRoutes } from '../../routes'
import { Link } from 'react-router'

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

  renderLogo() {
    return (
      <Link to={ReactRoutes.dashboardPath()}>
        <header className='nav-element logo'>Roots of Success</header>
      </Link>
    )
  }

  renderProfileTab() {
    return this.props.userType == 'admin' ? (
      <div className="nav-element right">
        <img src={this.user.image_url} className="prof-image"/>
        <p className="prof-name">{`${this.user.first_name} ${this.user.last_name}`}</p>
        <div className="dropdown-container">
          <Link
            className='dropdown-link'
            to={ReactRoutes.adminProfilePath(this.user.id)}>
            Profile
          </Link>
          <a
            href={RailsRoutes.adminsSignOutPath()}
            data-method="delete"
            className='dropdown-link'
          >
            Sign out
          </a>
        </div>
      </div>
    ) : (
      <div className="nav-element right">
        <p className="prof-name">
          {`${this.user.first_name} ${this.user.last_name}`}
        </p>
        <div className="dropdown-container">
          <Link
            className='dropdown-link'
            to={ReactRoutes.studentProfilePath(this.user.id)}>
            Profile
          </Link>
          <a
            href={RailsRoutes.studentsSignOutPath()}
            data-method="delete"
            className='dropdown-link'
          >
            Sign out
          </a>
        </div>
      </div>
    )
  }

  renderChildren() {
    console.log(this.user.image_url)
    return this.props.children.map((child, i) => {
      return child
    })
  }

  render() {
    return (
      <nav className='nav'>
        <div className='flex center'>
          <div className='container'>
            {this.renderLogo()}
            {this.renderProfileTab()}
            {this.renderChildren()}
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
