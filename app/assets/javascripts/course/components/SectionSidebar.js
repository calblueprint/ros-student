import _ from 'underscore'

import React from 'react'
import { Link } from 'react-router'
import Collapse from 'react-collapse'

import { getUser } from '../../utils/user_helpers'
import { RailsRoutes, ReactRoutes } from '../../shared/routes'
import { APIRoutes } from '../../shared/routes'
import SubsectionSidebar from './SubsectionSidebar'

class SectionSidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // isOpen: this.props.section.id == this.props.activeSectionId ? true : false
      isOpen: true
    }
    this.toggleCollapse = this.toggleCollapse.bind(this)
  }

  toggleCollapse() {
    const isOpen = this.state.isOpen
    this.setState({ isOpen: !isOpen })
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
        <div className='sidebar-section-title-container' onClick={this.toggleCollapse}>
          <h2>{this.props.section.title}</h2>
        </div>
        <Collapse isOpened={this.state.isOpen}>
          <ul>{this.renderSubsections()}</ul>
        </Collapse>
      </div>
    )
  }
}

export default SectionSidebar
