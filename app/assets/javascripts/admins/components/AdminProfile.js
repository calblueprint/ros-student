import _ from 'underscore'
import React from 'react'

import { request } from '../../shared/requests/request'
import { getUser, observeUser } from '../../utils/user_helpers'
import { Images } from '../../utils/image_helpers'

import UpdateAdminModal from './UpdateAdminModal'

class AdminProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.getUser(),
      openEditModal: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.observeUser = observeUser(() => {
      this.setState({ user: getUser() })
    })
  }

  componentWillUnmount() {
    this.observeUser.disconnect()
  }

  getUser() {
    return getUser().id == this.props.id ? getUser() : {}
  }

  getUserRequest() {
    const route = APIRoutes.getAdminPath(this.props.id)

    request.get(route, (response) => {
      this.setState({ user: response.student })
    }, (error) => {
      console.log(error)
    })
  }

  openModal(e) {
    e.preventDefault()
    this.setState({ openEditModal: true })
  }

  closeModal(e) {
    if (!_.isUndefined(e)) {
      e.preventDefault()
    }

    this.setState({ openEditModal: false })
  }

  renderImage() {
    return this.state.user.image_url || Images.default_profile
  }

  renderEditButton() {
    if (this.props.id == getUser().id) {
      return (
        <button
          className='button marginTop-xs student-profile-button'
          onClick={this.openModal}>
          Edit Profile
        </button>
      )
    }
  }

  render() {
    return (
      <div className='user-profile-container'>
        <img className='user-profile-image' src={this.renderImage()} />
        <h2 className='h2 marginTop-xxs'>
          {`${this.state.user.first_name} ${this.state.user.last_name}`}
        </h2>
        <p className='user-profile-info'>{this.state.user.username}</p>
        <p className='user-profile-info'>{this.state.user.email}</p>

        {this.renderEditButton()}

        <UpdateAdminModal
          id={this.props.id}
          openComponentForm={this.state.openEditModal}
          closeModal={this.closeModal} />
      </div>
    )
  }
}

export default AdminProfile
