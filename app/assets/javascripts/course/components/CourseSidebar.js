import _ from 'underscore'
import React from 'react'

import { Link } from 'react-router'

import request from '../../shared/requests/request'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SectionSidebar from './SectionSidebar'

class CourseSidebar extends React.Component {

  renderSections() {
    return _.map(this.props.courseSidebar.sections, (value) => {
      return (
        <SectionSidebar
          key={value.id}
          section={value}
          currentSubsection={this.props.courseSidebar.current_subsection}
          displayedSubsection={this.props.displayedSubsection}
          callback={this.props.callback}
        />
      )
    })
  }

  renderInfo() {
    return (
      <div className="sidebar-course-title-container">
        <h1 className="sidebar-course-title">{this.props.courseSidebar.name}</h1>
      </div>
    )
  }

  renderSidebar() {
    if (_.isEmpty(this.props.courseSidebar)) {
      return 'Loading'
    } else {
      return (
        <div>
          {this.renderInfo()}
          {this.renderSections()}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <div>{this.renderSidebar()}</div>
      </div>
    )
  }
}

export default CourseSidebar
