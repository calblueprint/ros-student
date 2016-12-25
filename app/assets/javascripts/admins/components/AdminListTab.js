import React from 'react'

import { APIRoutes } from '../../shared/routes'

import UserList from '../../shared/components/users/UserList'
import AddAdminModal from './AddAdminModal'

class AdminListTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      newUser: undefined,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setNewUser = this.setNewUser.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  setNewUser(user) {
    this.setState({ newUser: user })
  }

  render() {
    return (
      <div className='user-tab-container'>
        <button
          onClick={this.openModal}
          className='button user-list-add-button marginTopBot-sm'>
          Create Admin
        </button>

        <UserList
          editRoute={APIRoutes.getAdminsPath}
          deleteRoute={APIRoutes.deleteAdminPath}
          newUser={this.state.newUser}
          setNewUser={this.setNewUser}
        />

        <AddAdminModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          setNewUser={this.setNewUser}
        />
      </div>
    )
  }
}

export default AdminListTab
