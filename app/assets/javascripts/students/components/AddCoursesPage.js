import React from 'react'
import _ from 'underscore'
import update from 'immutability-helper'

import { APIRoutes } from '../../shared/routes'
import { getInputToParams, addFlash } from '../../utils/helpers/form_helpers'
import request from '../../shared/requests/request'

import CourseRequestTab from './CourseRequestTab'
import AddCodeTab from './AddCodeTab'
import Input from '../../shared/components/forms/Input'
import SaveButton from '../../shared/components/widgets/SaveButton'

class AddCoursesPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeTab: 0,
    }

    this.tabs = {
      REQUEST: 0,
      CODE: 1,
    }
  }

  setActiveTab(index, e) {
    e.preventDefault()
    this.setState({ activeTab: index })
  }

  getTabStyle(index) {
    return this.state.activeTab == index ? 'active' : ''
  }

  renderTab() {
    switch (this.state.activeTab) {
      case (this.tabs.REQUEST):
        return (
          <div className='marginTop-sm'>
            <CourseRequestTab />
          </div>
        )
      case (this.tabs.CODE):
        return(
          <div className='marginTop-sm'>
            <AddCodeTab />
          </div>
        )
    }
  }

  render() {
    return (
      <div className='add-courses-container marginTop-sm'>
        <button
          onClick={_.bind(this.setActiveTab, this, this.tabs.REQUEST)}
          className={`tab ${this.getTabStyle(this.tabs.REQUEST)}`}>
          Request courses
        </button>
        <button
          onClick={_.bind(this.setActiveTab, this, this.tabs.CODE)}
          className={`tab ${this.getTabStyle(this.tabs.CODE)}`}>
          Add courses with codes
        </button>
        {this.renderTab()}
      </div>
    )
  }
}

export default AddCoursesPage
