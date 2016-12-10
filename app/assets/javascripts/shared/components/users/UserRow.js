import _ from 'underscore'
import React, { PropTypes } from 'react'

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
    request.get(this.props.deleteRoute(id), (response) => {
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
      <div onClick={this.onRowClick()}>
        {`${this.props.user.first_name} ${this.props.user.last_name}`}

        <button onClick={this.openDeleteModal} className='button'>Delete</button>

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
