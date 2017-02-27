import _ from 'underscore'
import React, { PropTypes } from 'react'

import { getUser, setUser } from '../../../utils/user_helpers'
import { Images, convertImage } from '../../../utils/image_helpers'
import { RailsRoutes, ReactRoutes } from '../../routes'
import { Link } from 'react-router'

class Navbar extends React.Component {

  constructor(props) {
    super(props)
    this.user = getUser()
    this.state = {
      activeIndex: null,
    }
    this.setActiveChild = this.setActiveChild.bind(this)
    this.resetActiveChild = this.resetActiveChild.bind(this)
  }

  getProfilePath() {
    switch (this.props.bundleType) {
      case 'admin':
        return ReactRoutes.adminProfilePath(this.user.id)
      case 'student':
        return ReactRoutes.studentProfilePath(this.user.id)
      case 'courseEdit':
        return RailsRoutes.adminProfilePath(this.user.id)
    }
  }

  getSignOutPath() {
    return this.props.bundleTypes === 'admin' ? (
      RailsRoutes.adminsSignOutPath()
    ) : (
      RailsRoutes.studentsSignOutPath()
    )
  }

  getActiveStyle(i) {
    return i === this.state.activeIndex ? 'nav-element-container active' : 'nav-element-container'
  }

  getImage() {
    return this.user.image_url || Images.default_profile
  }

  setActiveChild(i) {
    this.setState({ activeIndex: i })
  }

  resetActiveChild() {
    this.setState({ activeIndex: null })
  }

  renderLogo() {
    return this.props.bundleType === 'courseEdit' ? (
      <a
        href={RailsRoutes.dashboardPath()}
        onClick={this.resetActiveChild}
      >
        <header className='nav-element logo'>Roots of Success</header>
      </a>
    ) : (
      <Link
        to={ReactRoutes.dashboardPath()}
        onClick={this.resetActiveChild}
      >
        <header className='nav-element logo'>Roots of Success</header>
      </Link>
    )
  }

  renderProfileLink() {
    return this.props.bundleType === 'courseEdit' ? (
      <a
        className='dropdown-link'
        href={this.getProfilePath()}
      >
        Profile
      </a>
    ) : (
      <Link
        className='dropdown-link'
        to={this.getProfilePath()}
      >
        Profile
      </Link>
    )
  }

  renderProfileTab() {
    return (
      <div className="nav-element right">
        <img src={this.getImage()} className="prof-image"/>
        <p className="prof-name">
          {`${this.user.first_name} ${this.user.last_name}`}
        </p>
        <div
          className="dropdown-container"
          onClick={this.resetActiveChild}
        >
          {this.renderProfileLink()}
          <a
            href={this.getSignOutPath()}
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
    if (this.props.children) {
      return this.props.children.map((child, i) => {
        return (
          <div
            className={this.getActiveStyle(i)}
            onClick={_.partial(this.setActiveChild, i)}
            key={i}
          >
            {child}
          </div>
        )
      })
    }
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

Navbar.propTypes = {
  bundleType: PropTypes.oneOf(['admin', 'student', 'courseEdit']),
}

export default Navbar
