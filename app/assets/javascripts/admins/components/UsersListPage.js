import _ from 'underscore'
import React from 'react'

import AdminListTab from './AdminListTab'
import StudentListTab from './StudentListTab'

class UsersListPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
    }

    this.tabs = {
      STUDENT: 0,
      ADMIN: 1,
    }
  }

  setActiveTab(index, e) {
    e.preventDefault()
    this.setState({ activeTab: index })
  }

  renderTab() {
    switch (this.state.activeTab) {
      case this.tabs.STUDENT:
        return (
          <div className='marginTop-sm admin-list-container'>
            <StudentListTab />
          </div>
        )
      case (this.tabs.ADMIN):
        return(
          <div className='marginTop-sm admin-list-container'>
            <AdminListTab />
          </div>
        )
    }
  }

  render() {
    return (
      <div className='flex center marginTop-xl'>
        <div className='container'>
          <button onClick={_.bind(this.setActiveTab, this, 0)}>Students</button>
          <button onClick={_.bind(this.setActiveTab, this, 1)}>Admins</button>
          {this.renderTab()}
        </div>
      </div>
    )
  }
}

export default UsersListPage
