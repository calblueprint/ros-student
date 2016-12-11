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
    request.get(this.props.editRoute(), (response) => {
      this.setState({ users: response })
    }, (error) => {
      console.log(error)
    })
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

  render() {
    return (
      <div className='user-list-container'>
        {this.state.users.map((user) => {
          return (
            <div>
              <div className='user-row-divider'/>
              <UserRow
                key={user.id}
                user={user}
                deleteRoute={this.props.deleteRoute}
                onDeleteUser={this.onDeleteUser}
                onRowClick={this.props.onRowClick}
              />
            </div>
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
