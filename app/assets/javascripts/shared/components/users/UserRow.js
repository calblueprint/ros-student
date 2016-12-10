import _ from 'underscore'
import React, { PropTypes } from 'react'

class UserRow extends React.Component {
  onRowClick() {
    return this.props.onRowClick ?
      _.partial(this.props.onRowClick, this.props.user) :
      ''
  }

  render() {
    return (
      <div onClick={this.onRowClick()}>
        {`${this.props.user.first_name} ${this.props.user.last_name}`}
        <button onClick={this.props.onDelete} className='button'>Delete</button>
      </div>
    )
  }
}

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRowClick: PropTypes.func,
}

export default UserRow
