import React, { PropTypes } from 'react'

class UserRow extends React.Component {
  render() {
    return (
      <div>
        {`${this.props.user.first_name} ${this.props.user.last_name}`}
        <button onClick={this.props.onDelete} className='button'>Delete</button>
      </div>
    )
  }
}

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default UserRow
