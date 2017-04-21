import _ from 'underscore'
import React, { PropTypes } from 'react'
import ReactTable from 'react-table'

import request from '../../requests/request'
import { Images } from '../../../utils/helpers/image_helpers'
import DeleteModal from '../widgets/DeleteModal'

import UserRow from './UserRow'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      openDeleteModal: null,
    }

    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.onDeleteUser = this.onDeleteUser.bind(this)
  }

  componentDidMount() {
    request.get(this.props.editRoute(), (response) => {
      this.setState({ users: response })
    }, (error) => {
      console.log(error)
    })
  }

  componentWillReceiveProps(nextProps) {
    /* We check whether or not we've created a new user */
    if (nextProps.newUser) {
      const users = this.state.users
      users.push(nextProps.newUser)
      this.setState({ users: users })
      this.props.setNewUser(undefined)
    }
  }

  openDeleteModal(userId) {
    this.setState({ openDeleteModal: userId })
  }

  closeDeleteModal(userId) {
    this.setState({ openDeleteModal: null })
  }

  deleteUser(id, e) {
    e.preventDefault()
    request.delete(this.props.deleteRoute(id), (response) => {
      this.props.onDeleteUser(response)
    }, (error) => {
      console.log(error)
    })
  }

  getColumns() {
    return [{
      header: 'First Name',
      accessor: 'first_name',
    }, {
      header: 'Last Name',
      accessor: 'last_name',
    }, {
      header: 'Username',
      accessor: 'username'
    }, {
      header: 'Email',
      accessor: 'email',
      minWidth: 200,
    }, {
      header: 'Delete',
      accessor: 'id',
      render: row => (
        this.getDeleteCell(row.value)
      ),
      maxWidth: 50,
    }]
  }

  getDeleteCell(userId) {
    return (
      <div className='delete-container'>
        <button
          onClick={_.partial(this.openDeleteModal, userId)}
          className='user-list-delete'>
          <img src={Images.delete} className='user-list-delete-image' />
        </button>
        <DeleteModal
          openDeleteModal={this.state.openDeleteModal === userId}
          closeModal={this.closeDeleteModal}
          deleteFunction={_.partial(this.deleteUser, userId)}
          objectType="user"
        />
      </div>
    )
  }

  onDeleteUser(user) {
    this.setState(
      {
        users: this.state.users.filter((otherUser) => {
          return otherUser.id != user.id
        })
      }
    )
  }

  // render() {
  //   return (
  //     <div className='user-list-container'>
  //       {this.state.users.map((user) => {
  //         return (
  //           <div key={user.id}>
  //             <div className='user-row-divider'/>
  //             <UserRow
  //               user={user}
  //               deleteRoute={this.props.deleteRoute}
  //               onDeleteUser={this.onDeleteUser}
  //               onRowClick={this.props.onRowClick}
  //             />
  //           </div>
  //         )
  //       })}
  //     </div>
  //   )
  // }

  render() {
    console.log(this.state.users)
    return (
      <div className='users-table-container marginBot-xxl'>
        <ReactTable
          className='-striped -highlight'
          data={this.state.users}
          columns={this.getColumns()}
          defaultPageSize={20}
          loading={_.isEmpty(this.state.users)}
          showFilters={true}
        />
      </div>
    )
  }
}

UserList.propTypes = {
  editRoute: PropTypes.func.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
  newUser: PropTypes.object,
  setNewUser: PropTypes.func,
}

export default UserList
