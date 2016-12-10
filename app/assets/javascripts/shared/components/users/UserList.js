import _ from 'underscore'
import React, { PropTypes } from 'react'

import request from '../../requests/request'

import UserRow from './UserRow'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],

    }

    this.onDeleteUser = this.onDeleteUser.bind(this)
  }

  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    request.get(this.props.editRoute(), (response) => {
      this.setState({ users: response })
    }, (error) => {
      console.log(error)
    })
  }

  onDeleteUser(user) {
    console.log('deleted')
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          return (
            <UserRow
              key={user.id}
              user={user}
              deleteRoute={this.props.deleteRoute}
              onDeleteUser={this.onDeleteUser}
              onRowClick={this.props.onRowClick}
            />
          )
        })}
      </div>
    )
  }
}

UserList.propTypes = {
  editRoute: PropTypes.func.isRequired,
  deleteRoute: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
}

export default UserList
