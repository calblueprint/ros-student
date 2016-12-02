import _ from 'underscore'
import React from 'react'

import { Link } from 'react-router'

import request from '../../shared/requests/request'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SectionSidebar from './SectionSidebar'

class CourseSidebar extends React.Component {

  getCurrentSectionIndex() {
    var sectionIndex = -1
    this.props.courseSidebar.sections.forEach((section, index) => {
      var subsectionIds = section.subsections.map((subsection) => subsection.id)
      if (_.contains(subsectionIds, this.props.currentSubsection.id)) {
        sectionIndex = index
      }
    })
    return sectionIndex
  }

  renderSections() {
    const currentSectionIndex = this.getCurrentSectionIndex()
    console.log(currentSectionIndex)
    return _.map(this.props.courseSidebar.sections, (value, index) => {
      return (
        <SectionSidebar
          key={value.id}
          section={value}
          displayedSubsection={this.props.displayedSubsection}
          currentSubsection={this.props.currentSubsection}
          sectionDisplayType={this.getSectionDisplayType(currentSectionIndex, index)}
          callback={this.props.callback}
        />
      )
    })
  }

  getSectionDisplayType(currentSectionIndex, sectionIndex) {
    if (sectionIndex > currentSectionIndex) {
      return 'all-inactive'
    } else if (sectionIndex === currentSectionIndex) {
      return 'both'
    } else {
      return 'all-active'
    }
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
