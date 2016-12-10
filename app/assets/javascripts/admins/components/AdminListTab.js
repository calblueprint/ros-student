import React from 'react'

import { APIRoutes } from '../../shared/routes'

import UserList from '../../shared/components/users/UserList'
import AddAdminModal from './AddAdminModal'

class AdminListTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Create Admin</button>
        <UserList
          editRoute={APIRoutes.getAdminsPath}
          deleteRoute={APIRoutes.deleteAdminPath}/>

        <AddAdminModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
        />
      </div>
    )
  }
}

export default AdminListTab
