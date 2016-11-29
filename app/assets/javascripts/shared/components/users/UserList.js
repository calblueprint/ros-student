import _ from 'underscore'
import React, { PropTypes } from 'react'

import request from '../../requests/request'

import UserRow from './UserRow'

class UserList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: []
    }

    this.getUsers()
  }

  getUsers() {
    request.get(this.props.route, (response) => {
      console.log(response)
      this.setState({ users: response })
    }, (error) => {
      console.log(error)
    })
  }

  deleteUser(id, e) {
    e.preventDefault()
    console.log('tried to delete')
  }

  render() {
    return (
      <div>
        {this.state.users.map((user) => {
          return (
            <UserRow
              key={user.id}
              user={user}
              onDelete={_.partial(this.deleteUser, user.id)}
            />
          )
        })}
      </div>
    )
  }
}

UserList.propTypes = {
  route: PropTypes.string.isRequired,
}

export default UserList
