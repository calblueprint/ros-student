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

  renderSubsections() {
    return this.props.section.subsections.map((value, index) => {
      return (
        <SubsectionSidebar
          key={value.id}
          subsection={value}
          displayedSubsection={this.props.displayedSubsection}
          activeSubsectionIds={this.props.activeSubsectionIds}
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
