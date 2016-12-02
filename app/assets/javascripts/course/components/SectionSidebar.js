import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SubsectionSidebar from './SubsectionSidebar'

class SectionSidebar extends React.Component {

  constructor(props) {
    super(props)
  }

  getCurrentSubsectionIndex() {
    return this.props.section.subsections.map((subsection) => subsection.id).indexOf(this.props.currentSubsection.id)
  }

  getSubsectionDisplayType(index) {
    console.log(this.getCurrentSubsectionIndex())
    switch (this.props.sectionDisplayType) {
      case 'all-inactive':
        return 'inactive'
      case 'both':
        return index > this.getCurrentSubsectionIndex() ? 'inactive' : ''
      case 'all-active':
        return ''
      default:
        return ''
    }
  }

  renderSubsections() {
    return this.props.section.subsections.map((value, index) => {
      return (
        <SubsectionSidebar
          key={value.id}
          subsection={value}
          displayedSubsection={this.props.displayedSubsection}
          currentSubsection={this.props.currentSubsection}
          subsectionDisplayType={this.getSubsectionDisplayType(index)}
          callback={this.props.callback}
        />
      )
    })
  }

  render() {
    return (
      <div className='sidebar-section-card'>
        <div className='sidebar-section-title-container'>
          <h2>{this.props.section.title}</h2>
        </div>
        <ul>{this.renderSubsections()}</ul>
      </div>
    )
  }
}

export default SectionSidebar
