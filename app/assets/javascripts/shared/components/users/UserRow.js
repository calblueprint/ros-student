import _ from 'underscore'
import React, { PropTypes } from 'react'

import { Images } from '../../../utils/image_helpers'
import request from '../../requests/request'

import DeleteModal from '../widgets/DeleteModal'

class UserRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openDeleteModal: false,
    }

    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
  }

  openDeleteModal() {
    this.setState({ openDeleteModal: true })
  }

  closeDeleteModal() {
    this.setState({ openDeleteModal: false })
  }

  deleteUser(id, e) {
    e.preventDefault()
    request.delete(this.props.deleteRoute(id), (response) => {
      this.props.onDeleteUser(response)
    }, (error) => {
      console.log(error)
    })
  }

  onRowClick() {
    return this.props.onRowClick ?
      _.partial(this.props.onRowClick, this.props.user) :
      ''
  }

  render() {
    return (
      <div
        className='flex user-row-container'
        onClick={this.onRowClick()}
      >
        <p className="user-row-name">{`${this.props.user.first_name} ${this.props.user.last_name}`}</p>
        <p className="user-row-username">{`${this.props.user.username}`}</p>
        <p className="user-row-email">{`${this.props.user.email}`}</p>

        <button
          onClick={this.openDeleteModal}
          className='user-list-delete'>
          <img src={Images.delete} className='user-list-delete-image' />
        </button>

        <DeleteModal
          openDeleteModal={this.state.openDeleteModal}
          closeModal={this.closeDeleteModal}
          deleteFunction={_.partial(this.deleteUser, this.props.user.id)}
          objectType="user"
        />
      </div>
    )
  }
}

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
}

export default UserRow
