import _ from 'underscore'
import React from 'react'

import { request } from '../../shared/requests/request'
import { getUser } from '../../utils/user_helpers'
import { Image } from '../../utils/image_helpers'

import UpdateStudentModal from './UpdateStudentModal'

class StudentProfile extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: this.getUser(),
      openEditModal: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  getUser() {
    return getUser().id == this.props.id ? getUser() : {}
  }

  getUserRequest() {
    const route = APIRoutes.getStudentPath(this.props.id)

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
    return this.state.user.image_url || Image.default_profile
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

        <UpdateStudentModal
          id={this.props.id}
          openEditModal={this.state.openEditModal}
          closeModal={this.closeModal} />
      </div>
    )
  }
}

export default StudentProfile
