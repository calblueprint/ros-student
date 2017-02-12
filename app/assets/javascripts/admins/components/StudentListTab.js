import React from 'react'

import { APIRoutes } from '../../shared/routes'

import UserList from '../../shared/components/users/UserList'
import StudentProgressModal from './StudentProgressModal'

class StudentListTab extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false,
      student: {}
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal(student) {
    this.setState({
      isModalOpen: true,
      student: student
    })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    return (
      <div className='user-tab-container'>
        <UserList
          userType="student"
          editRoute={APIRoutes.getStudentsPath}
          deleteRoute={APIRoutes.deleteStudentPath}
          openModal={this.openModal}
          closeModal={this.closeModal}
          isModalOpen={this.state.isModalOpen}
        />

        <StudentProgressModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal}
          student={this.state.student}
        />
      </div>
    )
  }
}

export default StudentListTab
